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
const EXPLORATION_PARAMETER = 0.3;

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
    for (let x = 0; x < 5; ++x) {
      for (let y = 0; y < 5; ++y) {
        let fillsEye = true;
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (liberties[x + dx]?.[y + dy] == 1) {
            fillsEye = false;
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
        moves.push(nc);
      }
    }
    if (moves.length) {
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
  return scoreTerminal(position, false);
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
    /** @type [number, number, string[][], [number,number]|null][] */
    this.children = [[this.hash ^ BITMASKS[50], 0, board, null]];
    for (let x = 0; x < 5; ++x) {
      for (let y = 0; y < 5; ++y) {
        let np = addMove(board, liberties, x, y, blackToPlay);
        if (!np) continue;
        let hash = zobristHash(np, !blackToPlay);
        this.children.push([hash, 0, np, [x, y]]);
      }
    }
    map.set(this.hash, this);

    // result of the playout rooted at this position
    this.U = fastPlayout(this.board, this.blackToPlay, history);

    // Playouts going though this node
    this.N = 1;

    // Expected utility of playouts going through this node
    this.Q = this.U;

    // Total utility of playouts going through this node
    this.S = this.U;

    // Total square of utility of playouts going through this node
    this.SS = this.U ** 2;
  }

  getcPUCT() {
    return (20 + this.N * Math.max(0.1, Math.sqrt(
      (this.SS) / (this.N)
      - ((this.S) / (this.N)) ** 2))) / (this.N + 1);
  }
}

// Represents a terminal state; used for double pass
class TerminalNode {
  /**
   * @param {string} key
   * @param {Map<number, MCGSNode>} map
   */
  constructor(key, score, map) {
    map.set(key, this);
    this.U = score;
    this.N = 1;
    this.Q = score;
    this.S = this.U;
    this.SS = this.U
  }
  getcPUCT() { return 0; }
}

/** @param {string[] | string[][]} board */
async function getMoves(board) {
  let b = board.map(x => [...x]);

  let map = new Map();
  let root = new MCGSNode(b, true, map, new Set([zobristHash(b, true)]));
  for (let i = 0; i < PLAYOUTS; ++i) {
    if (i % 2000 == 1999) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      // Terminate early if one move is overwhelmingly preferred, or already guaranteed to win
      let c = root.children.reduce((x, y) => y[1] > x[1] ? y : x);
      if (c[3]) {
        if (c[1] > 0.9 * i || c[1] >= 0.5 * PLAYOUTS) {
          break;
        }
        // Or if very winning or losing
        if (root.Q > 20 || root.Q < 4) break;
      }
    }
    let seen = new Set();
    seen.add(root.hash);
    let path = [root];
    let nn = 0;
    while (true) {
      let ln = path.at(-1);
      let bestScore = -Infinity;
      let bestCount = 0;
      let nh = ln.children[0];
      for (let c of ln.children) {
        if (seen.has(c[0])) {
          if (c[3] == null) {
            let key = 't' + ln.hash;
            ln.DP ??= [key, 0, null, null];
            // the key is a string so it cannot be conflated with normal nodes
            let child = map.get(key)
            if (!map.has(key)) {
              nn = scoreTerminal(ln.board, true);
              child = new TerminalNode(key, nn, map);
            }
            let score = (ln.blackToPlay ? 1 : -1) * child.U;
            if (score > bestScore) {
              bestScore = score;
              bestCount = 1;
              nn = child.U;
              nh = ln.DP;
            }
          }
          continue;
        }
        let score = (ln.blackToPlay ? 1 : -1) *
          (map.get(c[0])?.Q ?? ln.Q) +
          (EXPLORATION_PARAMETER *
            (map.get(c[0])?.getcPUCT?.() ?? 25) // child node's variance
            * Math.sqrt(ln.N) / (1 + c[1]));
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
      
      // Update node statistics
      ln.N++;
      nh[1]++;
      if (typeof nh[0] == 'string') {
        break;
      }
      seen.add(nh[0]);
      if (map.has(nh[0])) {
        path.push(map.get(nh[0]));
      } else {
        nn = new MCGSNode(nh[2], !ln.blackToPlay, map, seen).U;
        break;
      }
    }
    // See https://github.com/lightvector/KataGo/blob/master/docs/GraphSearch.md
    for (let i = path.length; i-- > 0;) {
      let node = path[i];
      let s = 0;
      for (let c of node.children) {
        s += c[1] * (map.get(c[0])?.Q ?? 0);
      }
      // this is maybe not exactly right - we should
      // only consider it if it actually is double pass
      // but it's close enough
      if (node.DP) {
        s += node.DP[1] * map.get(node.DP[0])?.U ?? 0;
      }
      node.Q = (node.U + s) / node.N;
      node.S += nn;
      node.SS += nn ** 2;
    }
  }
  let children = root.children.toSorted((x, y) => y[1] - x[1]);
  for (let c of children) {
    c[2] = map.get(c[0])?.Q ?? 0;
  }
  return [root.Q, root.getcPUCT(), children];
}

/** 
 * @param {string[][]} position 
 * @param {boolean} immediate if true, ignores liveness analysis
 * */
function scoreTerminal(position, immediate) {
  let bl = 0, wl = 0;
  let wc = 0, bc = 0, ec = 0;
  for (let x = 0; x < 5; ++x) {
    for (let y = 0; y < 5; ++y) {
      if (position[x][y] == 'X') {
        bc++;
      }
      if (position[x][y] == 'O') {
        wc++;
      }
      if (position[x][y] == '.') {
        let bn = false, wn = false;
        for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          if (position[x+dx]?.[y+dy] == 'X') {
            bn = true;
          }
          if (position[x+dx]?.[y+dy] == 'O') {
            wn = true;
          }
        }
        if (bn) {
          if (wn) ec++;
          else bl++;
        } else {
          if (wn) wl++;
          else ec++;
        }
      }
    }
  }
  if (immediate){
    return bc + bl;
  }

  if (wl == bl) return bc + bl;  // we assume it's seki or something
  if (wl >= 2 && bl >= 2) return bc + bl;  // same
  if (wl > bl) return 0;  // big loss
  return wc + ec + bc + bl + wl;  // big win
}

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog('asleep');
  ns.clearLog();

  if (!Worker) {
    ns.print('Please get a real browser');
    ns.exit();
  }

  let worker_script = ns.read(ns.getScriptName()).split('export')[0] + `
  onmessage = function(e) {
    getMoves(e.data).then(r => {
      postMessage(r);
    });
  }`;
  let blob = new Blob([worker_script], {type: 'module'});
  let url = URL.createObjectURL(blob);
  let worker = new Worker(url);
  let resolve;
  worker.onmessage = function(e) {
    resolve?.(e.data);
  }
  ns.atExit(() => worker.terminate(), 'worker');
  let getMoves = function(d) {
    return new Promise((res, rej) => {
	    ns.atExit(rej, 'worker_promise')
	    resolve = res;
      worker.postMessage(d);
	  });
  }

  let start = Date.now();
  l: for (let i = 0; i < 100; ++i) {
    do {
      ns.go.resetBoardState('Illuminati', 5);
    } while (ns.go.getBoardState()[2][2] != '.')

    let lastMove = await ns.go.makeMove(2,2);
    while (lastMove.type != 'gameOver') {
      if (lastMove.type == 'pass') {
        // end the game if there are no white stones left
        if (!ns.go.getBoardState().join('').includes('O')) {
          await ns.go.passTurn();
          break;
        }
      }

      let [q, s, moves] = await getMoves(ns.go.getBoardState());
      ns.print('Q: ', q, ' S: ', s);
      let moved = false;
      let legalmoves = ns.go.analysis.getValidMoves();
      let passq = 0;
      for (let [h, n, q, m] of moves) {
        if (!m) {
          passq = q;
          continue;
        }
        if (legalmoves[m[0]][m[1]]) {
          if (q > passq - 1) {
            lastMove = await ns.go.makeMove(...m);
            moved = true;
            break;
          }
        }
      }
      if (!moved) {
        // ns.tprint(ns.go.getBoardState().join('\n'));
        lastMove = await ns.go.passTurn();
      }
    }
    await ns.asleep(0);
  }
  ns.print('Average game time was ', (Date.now() - start) / 100000, 'seconds');
}
