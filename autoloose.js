const BITMASKS =
  [-1859522833, -1739909149, -931036797, -1601624096, 857669814,
    1819304447, 1392322075, 323843675, -362807465, -1232092001,
    260092070, 1439385049, -249468074, -1990148517, 903990427,
    2003321, 666241572, -1551804152, 919986533, 1416863106,
  -985183921, 936642381, 173734385, 1721693366, 77934800, 96015055,
    1582647486, -760826094, 1969356275, 1401284072, 480448628,
  -1172367894, 820745004, 1626939348, 831399107, -217963708,
    1260498195, 1415842264, -1897880285, -273553814, 1944522789,
    599390262, 1033445011, -937107540, 1168511328, 1158173073,
    894866539, 1807160375, -599589627, 498624852, -1271883029]
const PLAYOUTS = 10000;

/** @param {string[][]} board
  * @param {boolean} blackToPlay */
function zobristHash(board, blackToPlay) {
  var x = 0;
  for (var i = 0; i < 5; ++i) {
    for (var j = 0; j < 5; ++j) {
      if (board[i][j] == 'O')
        x ^= BITMASKS[2 * (5 * j + i)];
      if (board[i][j] == 'X')
        x ^= BITMASKS[2 * (5 * j + i) + 1];
    }
  }
  if (blackToPlay) {
    x ^= BITMASKS[50];
  }
  return x;
}

/** 
 * @param {string[][]} board
 * @param {number[][]} liberties
 * @param {number} x
 * @param {number} y
 * @param {boolean} blackToPlay
 */
function addMove(board, liberties, x, y, blackToPlay) {
  // TODO: also update the Zobrist hash and liberties here.
  if (board[x][y] != '.') return null;
  /** @type {[number, number][]} */
  let toCapture = [];
  let legal = false;
  for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    switch (board[x + dx]?.[y + dy]) {
      case '.':
        legal = true;
        break;
      case 'X':
        if (blackToPlay) {
          if (liberties[x + dx][y + dy] > 1) {
            legal = true;
          }
        } else {
          if (liberties[x + dx][y + dy] == 1) {
            legal = true;
            toCapture.push([x + dx, y + dy]);
          }
        }
        break;
      case 'O':
        if (blackToPlay) {
          if (liberties[x + dx][y + dy] == 1) {
            legal = true;
            toCapture.push([x + dx, y + dy]);
          }
        } else {
          if (liberties[x + dx][y + dy] > 1) {
            legal = true;
          }
        }
    }
  }
  if (!legal) return null;
  let bc = board.map(x => [...x]);
  bc[x][y] = blackToPlay ? 'X' : 'O';
  for (let i = 0; i < toCapture.length; ++i) {
    let [xx, yy] = toCapture[i];
    bc[xx][yy] = '.';
    for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      if (bc[xx + dx]?.[yy + dy] == (blackToPlay ? 'O' : 'X')) {
        bc[xx + dx][yy + dy] = '.';
        toCapture.push([xx + dx, yy + dy]);
      }
    }
  }
  return bc;
}

/** @param {string[][]} position */
function getLibertiesLite(position) {
  let liberties = position.map(x => x.map(() => -1));
  for (let x = 0; x < 5; ++x) {
    for (let y = 0; y < 5; ++y) {
      if (liberties[x][y] == -1 && (position[x][y] == 'X' || position[x][y] == 'O')) {
        let l = 0;
        let seen = [];
        let group = [[x, y]];
        seen[10 * x + y] = 1;
        for (let i = 0; i < group.length; ++i) {
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            let xx = group[i][0] + dx, yy = group[i][1] + dy;
            if (seen[10 * xx + yy]) continue;
            seen[10 * xx + yy] = 1;
            if (position[xx]?.[yy] == position[x][y]) {
              group.push([xx, yy])
            } else if (position[xx]?.[yy] == '.') {
              l++;
            }
          }
        }
        for (let [xx, yy] of group) {
          liberties[xx][yy] = l;
        }
      }
    }
  }
  return liberties;
}

/**
 * @param {string[][]} position
 * @param {boolean} blackToPlay
 * @param {Set<number>} history
 */
function fastPlayout(position, blackToPlay, history, ns) {
  let lastPassed = false;
  for (let i = 0; i < 30; ++i) {
    // pick a non-dumb move at random, defaulting to pass
    // (a move is dumb if it is self-atari or fills in an eye for no reason)
    let np = position.map(x => [...x]);
    let liberties = getLibertiesLite(position);
    let moves = [];
    let priorityMoves = [];
    for (let x = 0; x < 5; ++x) {
      for (let y = 0; y < 5; ++y) {
        let fillsEye = true;
        //let isAtari = false;
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (liberties[x + dx]?.[y + dy] == 1) {
            fillsEye = false;
            /*
            if ((position[x + dx]?.[y + dy] == 'X') ^ blackToPlay) {
              isAtari = true;
            }
            */
          }
          if (position[x + dx]?.[y + dy] == '.') {
            fillsEye = false; break;
          }
          if (position[x + dx]?.[y + dy] == 'O') {
            if (blackToPlay) {
              fillsEye = false; break;
            }
          }
          if (position[x + dx]?.[y + dy] == 'X') {
            if (!blackToPlay) {
              fillsEye = false; break;
            }
          }
        }
        if (fillsEye) continue;
        let nc = addMove(position, liberties, x, y, blackToPlay);
        if (!nc) continue;
        let hash = zobristHash(nc, !blackToPlay);
        if (history.has(hash)) continue;

        // if (isAtari && !blackToPlay) priorityMoves.push(np);
        moves.push(nc);
      }
    }
    if (priorityMoves.length) {
      lastPassed = false;
      np = priorityMoves[Math.floor(Math.random() * priorityMoves.length)]
    } else if (moves.length) {
      lastPassed = false;
      np = moves[Math.floor(Math.random() * moves.length)]
    } else {
      if (lastPassed) break;
      lastPassed = true;
    }
    position = np;
    blackToPlay = !blackToPlay;
    history.add(zobristHash(position, blackToPlay));
  }
  return scoreTerminal(position);
}

function moveName(x, y) {
  return 'ABCDE'[x] + (y + 1);
}

class MCGSNode {
  /**
   * @param {string[][]} board
   * @param {boolean} blackToPlay
   * @param {Map<number, MCGSNode>} map
   * @param {Set<number>} history only used for fast playout
   */
  constructor(board, blackToPlay, map, history) {
    this.board = board;
    this.blackToPlay = blackToPlay;
    this.hash = zobristHash(board, blackToPlay);

    //let bb = board.map(x => x.join(''));
    //let liberties = this.ns.go.analysis.getLiberties(bb);
    let liberties = getLibertiesLite(board);
    /** @type [number, number, string[][], [number,number]|null, number][] */
    this.children = [[this.hash ^ BITMASKS[50], 0, board, null, 0.2]];
    for (let x = 0; x < 5; ++x) {
      for (let y = 0; y < 5; ++y) {
        let np = addMove(board, liberties, x, y, blackToPlay);
        if (!np) continue;
        // check for move dumbness
        let weight = 1;
        let fillsEye = true;
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (liberties[x + dx]?.[y + dy] == 1) {
            weight *= 2; fillsEye = false;
          }
          if (board[x + dx]?.[y + dy] == '.') {
            fillsEye = false;
          }
          if (board[x + dx]?.[y + dy] == 'O' && blackToPlay) {
            fillsEye = false;
          }
          if (board[x + dx]?.[y + dy] == 'X' && !blackToPlay) {
            fillsEye = false;
          }
        }
        if (fillsEye) weight = 0.05;

        let hash = zobristHash(np, !blackToPlay);
        this.children.push([hash, 0, np, [x, y], weight]);
      }
    }
    map.set(this.hash, this);

    // result of the playout rooted at this position
    this.U = fastPlayout(this.board, this.blackToPlay, history, this.ns);
    this.N = 1;
    this.Q = this.U;

    // results of all playouts going through this position
    this.PV = [this.U];
  }

  getcPUCT() {
    let avg = 0;
    for (let v of this.PV) avg += v;
    avg /= this.PV.length;
    let variance = 4;
    for (let v of this.PV) variance += (v - avg) ** 2;
    return (variance / (1 + this.PV.length)) ** 0.5;
  }
}

/** @param {NS} ns */
async function getMoves(ns) {
  let b = ns.go.getBoardState().map(x => x.split(''));

  let map = new Map();
  let root = new MCGSNode(b, true, map, new Set([zobristHash(b, true)]), ns);
  for (let i = 0; i < PLAYOUTS; ++i) {
    if (i % 1000 == 999) {
      await ns.asleep(0);
    }
    let seen = new Set();
    seen.add(root.hash);
    let path = [root];
    let nn = 0;
    // See https://github.com/lightvector/KataGo/blob/master/docs/GraphSearch.md
    // for the explanation of this algorithm.
    while (true) {
      if (path.length > 100) {
        ns.print('aborting due to path overflow')
        ns.print(path.map(x=>x.hash));
        ns.exit();
      }
      let ln = path.at(-1);
      let bestScore = -Infinity;
      let bestCount = 0;
      let nh = ln.children[0];
      for (let c of ln.children) {
        if (seen.has(c[0])) {
          if (c[3] != null) {
            continue;  // illegal due to superko
          }
          // consider pass as normal
        }
        let score = (ln.blackToPlay ? 1 : -1) *
          c[4] *
          (map.get(c[0])?.Q ?? ln.Q) +
          (ln.getcPUCT() * Math.sqrt(ln.N) / (c[1]));
        if (score > bestScore) {
          bestScore = score;
          bestCount = 1;
          nh = c;
        } else if (score == bestScore) {
          bestCount++;
          if (Math.random() * bestCount < 1) {
            nh = c;
          }
        }
      }
      if (nh[0] === path.at(-2)?.hash) {
        // double pass ends the game
        nn = scoreTerminal(ln.board);
        break;
      }
      // Update node statistics
      nh[1]++;
      ln.N++;
      seen.add(nh[0]);
      if (map.has(nh[0])) {
        path.push(map.get(nh[0]));
      } else {
        nn = new MCGSNode(nh[2], !ln.blackToPlay, map, seen, ns).U;
        break;
      }
    }
    for (let i = path.length; i-- > 0;) {
      let node = path[i];
      let s = 0;
      for (let c of node.children) {
        s += c[1] * (map.get(c[0])?.Q ?? 0);
      }
      node.Q = (node.U + s) / node.N;
      node.PV.push(nn);
    }
  }
  let children = root.children.toSorted((x, y) => y[1] - x[1]);
  for (let c of children) {
    ns.print('Move: ', c[3] ? moveName(...c[3]) : 'pass');
    ns.print('N = ' + c[1] + ', Q = ' + (map.get(c[0])?.Q ?? 0));
  }
  return children;
}

function scoreTerminal(position) {
  let liberties = getLibertiesLite(position);
  let bl = 0, wl = 0;
  let wc = 0, bc = 0, ec = 0;
  for (let x = 0; x < 5; ++x) {
    for (let y = 0; y < 5; ++y) {
      if (position[x][y] == 'X') {
        bc++;
        if (liberties[x][y] > bl) bl = liberties[x][y];
      }
      if (position[x][y] == 'O') {
        wc++;
        if (liberties[x][y] > wl) wl = liberties[x][y];
      }
      if (position[x][y] == '.') {
        ec++;
      }
    }
  }
  if (wl == bl) return bc;  // we assume it's seki or something
  if (wl >= 2 && bl >= 2) return bc;  // same
  if (wl > bl) return 0;  // big loss
  return wc + ec + bc;  // big win
}

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog('asleep');
  ns.clearLog();
  for (let i = 0; i < 100; ++i) {
    do {
      ns.go.resetBoardState('Illuminati', 5);
    } while (ns.go.getBoardState()[2][2] != '.');
    let lastMove = await ns.go.makeMove(2, 2);

    while (lastMove.type != 'gameOver') {
      if (lastMove.type == 'pass') {
        // end the game if there are no white stones left
        if (!ns.go.getBoardState().join('').includes('O')) {
          await ns.go.passTurn();
          break;
        }
      }

      let moves = await getMoves(ns);
      let moved = false;
      let legalmoves = ns.go.analysis.getValidMoves();
      for (let [h, n, q, m] of moves) {
        if (!m) {
          lastMove = await ns.go.passTurn();
          moved = true;
          break;
        }
        if (legalmoves[m[0]][m[1]]) {
          lastMove = await ns.go.makeMove(...m);
          moved = true;
          break;
        }
      }
      if (!moved) {
        ns.tprint('WARNING: fell through to pass in position:');
        ns.tprint(ns.go.getBoardState().join('\n'));
        lastMove = await ns.go.passTurn();
      }
    }
    await ns.asleep(0);
  }

}
