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

// Maximum number of playouts to use for MCGS
const PLAYOUTS = 10000;

// Hand tuned value for MCGS exploration
const EXPLORATION_PARAMETER = 0.3;

// If true, white's play in the MCGS is modified to
// account for some AI biases
const USE_AI_TWEAKS = true;

// If true, resets boards where AI starts with [2,2]
// and always plays [2,2] as the first move
const RESET_FOR_TENGEN = false;

// Switch for debugging
const ANALYSIS_MODE = true;

/** @param {string[][] | string[]} board
  * @param {boolean} blackToPlay */
function zobristHash(board, blackToPlay) {
  var x = 0;
  for (var i = 0; i < 5; ++i) {
    for (var j = 0; j < 5; ++j) {
      if (board[i][j] == 'O')
        x ^= BITMASKS[2 * (5 * i + j)];
      if (board[i][j] == 'X')
        x ^= BITMASKS[2 * (5 * i + j) + 1];
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
function fastPlayout(position, blackToPlay, history) {
  let lastPassed = false;
  let liberties = getLibertiesLite(position);
  for (let i = 0; i < 30; ++i) {
    // pick a non-dumb move at random, defaulting to pass
    // (a move is dumb if it is self-atari or fills in an eye for no reason)
    let np = position;
    let nextLiberties = liberties;
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
        moves.push([x,y]);
      }
    }
    while (moves.length) {
      let i = Math.floor(Math.random() * moves.length);
      let [x,y] = moves[i];
      let nc = addMove(position, liberties, x, y, blackToPlay);
      if (!nc) {
        moves.splice(i,1);
        continue;
      }
      let hash = zobristHash(nc, false);
      if (history.has(hash)) {
        moves.splice(i,1);
        continue;
      }
      let nl = getLibertiesLite(nc);
      if (nl[x][y] == 1) {
        moves.splice(i,1);
        continue;
      }

      lastPassed = false;
      np = nc;
      nextLiberties = nl;
      break;
    }
    if (!moves.length) {
      if (lastPassed) break;
      np = position;
      nextLiberties = liberties;
      lastPassed = true;
    }
    position = np;
    liberties = nextLiberties;
    blackToPlay = !blackToPlay;
    history.add(zobristHash(position, false));
  }
  return scoreTerminal(position, false);
}

function moveName(x, y) {
  return 'ABCDE'[x] + (y + 1);
}

/**
 * @param {string[][]} board
 */
function countWhiteEyes(board) {
  let eyeCount = 0;
  let checked = board.map(x=>x.map(()=>false));
  for (let x = 0; x < 5; ++x) {
    for (let y = 0; y < 5; ++y) {
      let chainID = 5*x + y + 1;
      if (checked[x][y] || board[x][y] != 'O') continue;
      let chain = [[x,y]];
      let liberties = [];
      for (let i = 0; i < chain.length; ++i) {
        let [xx,yy] = chain[i];
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (checked[xx+dx]?.[yy+dy] !== false) continue;
          if (board[xx+dx]?.[yy+dy] == 'O') {
            chain.push([xx+dx,yy+dy]);
            checked[xx+dx][yy+dy] = chainID;
          } else if (board[xx+dx]?.[yy+dy] == '.') {
            liberties.push([xx+dx,yy+dy]);
          }
        }
      }
      for (let [x,y] of liberties) {
        if (checked[x][y] !== false) continue;
        checked[x][y] = chainID;
        let eye = [[x,y]];
        let toCheck = [];
        let isEye = true;
        c: for (let i = 0; i < eye.length; ++i) {
          let [xx,yy] = eye[i];
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            if (board[xx+dx]?.[yy+dy] == 'X') {
              isEye = false;
            }
            if (board[xx+dx]?.[yy+dy] == '.') {
              if (checked[xx+dx]?.[yy+dy] !== false) continue;
              checked[xx+dx][yy+dy] = chainID;
              eye.push([xx+dx,yy+dy]);
            }
            if (board[xx+dx]?.[yy+dy] == 'O') {
              if (checked[xx+dx][yy+dy] != chainID) {
                // recheck them later with the chain surround logic
                toCheck.push([xx+dx,yy+dy]);
              }
            }
          }
        }
        if (!isEye || eye.length > 11) continue;
        let seen = [];
        h: for (let i = 0; i < toCheck.length; ++i) {
          let [xx,yy] = toCheck[i];
          seen[10*xx + yy] = true;
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            if (board[xx+dx]?.[yy+dy] == null || 
                board[xx+dx]?.[yy+dy] == '#') continue;
            if (board[xx+dx]?.[yy+dy] == 'X') {
              isEye = false;
              break h;
            }
            if (board[xx+dx]?.[yy+dy] == 'O' &&
              checked[xx+dx]?.[yy+dy] == chainID) {
              continue;
            }
            if (seen[10*(xx+dx) + (yy+dy)]) continue;
            seen[10*(xx+dx) + (yy+dy)] = true;
            toCheck.push([xx+dx, yy+dy]);
          }
        }
        if (isEye) {
          eyeCount++;
        } else {
          // reset checked status so enclosing chains can check
          for (let [x,y] of eye) checked[x][y] = false;
        }
      }
    }
  }
  return eyeCount;
}

class MCGSNode {
  /**
   * @param {string[][]} board
   * @param {boolean} blackToPlay
   * @param {Map<number, MCGSNode>} map
   * @param {Set<number>} history hashes of previous game states, used for superko detection
   */
  constructor(board, blackToPlay, map, history) {
    this.board = board;
    this.blackToPlay = blackToPlay;
    this.hash = zobristHash(board, blackToPlay);

    let liberties = getLibertiesLite(board);

    /** @type [number, number, string[][], [number,number]|null, number, MCGSNode|null][] */
    this.children = [[this.hash ^ BITMASKS[50], 0, board, null, 1, null]];

    let whiteEyes = (USE_AI_TWEAKS && !blackToPlay) && countWhiteEyes(board);
    for (let x = 0; x < 5; ++x) {
      for (let y = 0; y < 5; ++y) {
        let np = addMove(board, liberties, x, y, blackToPlay);
        if (!np) continue;
        let hash = zobristHash(np, !blackToPlay);
        let weight = 1;
        if (USE_AI_TWEAKS) {
          if (!blackToPlay) {
            let isatari = false;
            let iscapture = false;
            let isdefend = false;
            let isnobi = false;
            let white_or_offline_neighbors = 0;
            let emptycount = 0;
            let neighborliberties = 1;
            for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
              if (board[x + dx]?.[y + dy] == 'X') {
                if (liberties[x+dx][y+dy] == 2) {
                  isatari = true;
                } else if (liberties[x+dx][y+dy] == 1) {
                  iscapture = true;
                }
              }
              if (board[x + dx]?.[y + dy] == 'O') {
                white_or_offline_neighbors++;
                // it also won't play eye moves from a group that has
                // two eyes, but i don't really feel like checking
                let islone = true;
                for (let [ddx, ddy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                  if (board[x + dx + ddx]?.[y + dy + ddy] == 'O') islone = false;
                }
                if (!islone) isnobi = true;
                if (liberties[x+dx][y+dy] == 1) {
                  isdefend = true;
                } else if (liberties[x+dx]?.[y+dy] > neighborliberties) {
                  neighborliberties = liberties[x+dx][y+dy];
                }
              }
              if (board[x + dx]?.[y + dy] == '.') {
                emptycount++;
              }
              if (board[x + dx]?.[y + dy] == null || board[x + dx]?.[y + dy] == '#') {
                white_or_offline_neighbors++;
              }
            }
            let makesEye = false;
            if (!iscapture) {
              let nb = board.map(x=>[...x]);
              nb[x][y] = 'O';
              let newWhiteEyes = countWhiteEyes(nb);
              if (newWhiteEyes > whiteEyes) makesEye = true;
            }

            if (iscapture) {
              weight = 100;
            } else if (isdefend && neighborliberties + emptycount > 2) {
              weight = 80;
            } else if (makesEye && isnobi && white_or_offline_neighbors > 1 && emptycount > 0) {
              weight = 60;
            } else if (isatari && neighborliberties + emptycount > 2) {
              weight = 40;
            }
          }
        }
        this.children.push([hash, 0, np, [x, y], weight, null]);
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

/** 
 * @param {string[] | string[][]} board 
 * @param {number[]} seen_hashes
 */
function getMoves(board, seen_hashes = []) {
  let b = board.map(x => [...x]);

  let map = new Map();
  let root = new MCGSNode(b, true, map, new Set([seen_hashes]));
  for (let i = 0; i < PLAYOUTS; ++i) {
    if (i % 2000 == 1999) {
      let c = root.children.reduce((x, y) => y[1] > x[1] ? y : x);
      if (c[1] >= 0.5 * PLAYOUTS || c[1] > 0.9 * i) {
        break;
      }
      if (root.Q > 20 || root.Q < 4) break;
      if (root.getcPUCT() < 2) break;
    }
    let seen = new Set(seen_hashes);
    seen.add(zobristHash(b, false));
    let path = [root];
    let nn = 0;  // result of playout
    let lastPassed = false;
    while (true) {
      let ln = path.at(-1);
      let bestScore = -Infinity;
      let bestCount = 0;
      let nh = ln.children[0];
      for (let c of ln.children) {
        if (seen.has(zobristHash(c[2],false))) {
          if (c[3] == null) {
            if (lastPassed) {
            ln.DP ??= ['t', 0, null, null, 1, scoreTerminal(ln.board, true)];
            let score = (ln.blackToPlay ? 1 : -1) * ln.DP[5];
            // no exploration factor because we know terminal nodes have no variance
            if (score > bestScore) {
              bestScore = score;
              bestCount = 1;
              nn = ln.DP[5];
              nh = ln.DP;
            }
            continue;
            }
          } else {
            continue;
          }
        }
        // eagerly update cached child pointer
        c[5] ??= map.get(c[0]);
        let score =
          ((ln.blackToPlay ? 1 : -1) *
            (c[5]?.Q ?? ln.Q) +
            (EXPLORATION_PARAMETER *
            (c[5]?.getcPUCT?.() ?? 25) // child node's variance
              * Math.sqrt(ln.N) / (1 + c[1])));
        if (USE_AI_TWEAKS && !ln.blackToPlay) {
          if (c[4] < 1) continue;
          score += c[4];
        }
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
      lastPassed = !nh[3];
      if (typeof nh[0] == 'string') {
        nn = nh[5];
        break;
      }
      seen.add(zobristHash(nh[2], false));
      nh[5] ??= map.get(nh[0]);
      if (nh[5]) {
        path.push(nh[5]);
      } else {
        nh[5] = new MCGSNode(nh[2], !ln.blackToPlay, map, seen);
        nn = nh[5].U;
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
      if (node.DP) {
        s += node.DP[1] * node.DP[5];
      }
      node.Q = (node.U + s) / node.N;
      node.S += nn;
      node.SS += nn ** 2;
    }
  }
  if (root.DP) {
    // white passed last move; DP replaces the pass node
    root.children[0] = root.DP;
  }
  let children = root.children.toSorted((x, y) => y[1] - x[1]);
  for (let c of children) {
    c[2] = c[5]?.Q ?? 0;
  }
  if (ANALYSIS_MODE) {
  let refutation = children[0][5]?.children;
  if (refutation) {
    refutation.sort((x,y) => y[1] - x[1]);
    for (let r of refutation) {
      console.log(r[3] ? moveName(...r[3]) : 'pass', r[1], r[4]);
    }
  }
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
          if (position[x + dx]?.[y + dy] == 'X') {
            bn = true;
          }
          if (position[x + dx]?.[y + dy] == 'O') {
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
  if (immediate) {
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
    postMessage(getMoves(...e.data));
  }`;
  let blob = new Blob([worker_script], { type: 'text/javascript' });
  let url = URL.createObjectURL(blob);
  let worker = new Worker(url);
  let resolve;
  worker.onmessage = function (e) {
    resolve?.(e.data);
  }
  ns.atExit(() => worker.terminate(), 'worker');
  let getMoves = function (d, m) {
    return new Promise((res, rej) => {
      ns.atExit(rej, 'worker_promise')
      resolve = res;
      worker.postMessage([d, m]);
    });
  }
  
  if (ANALYSIS_MODE) {
  ns.clearLog()
  ns.ui.setTailTitle('Analysis mode')

  // analyze current game state
  //let seen = ns.go.getMoveHistory().map(x=>zobristHash(x,false));
  //let [q,s,moves] = await getMoves(ns.go.getBoardState(), seen, false);
   //let cord = ["O.OO.",".OOOX","OOOX.","XOX.X",".X.X."];
 //ns.print(countWhiteEyes(cord.map(x=>[...x])))
 //return;
  // analyze board
   let bord = ["O.OO.",".OOOX",".OOX.","XOX.X",".X.X."];
   let seen = [];
   let [q,s,moves] = await getMoves(bord, seen);

  for (let [h, n, q, m] of moves) {
    ns.print(m ? moveName(...m) : 'pass', ' N = ', n, ' Q = ', q);
    //if (seen.includes(h) && m) {
    //  ns.print('illegal due to superko rule')
    //}
  }
  return;
  }

  let start = Date.now();
  let wins = 0;
  for (let i = 0; i < 1000; ++i) {
    let lastMove = {};
    ns.go.resetBoardState('Illuminati', 5);
    if (RESET_FOR_TENGEN) {
      while (ns.go.getBoardState()[2][2] != '.') {
        ns.go.resetBoardState('Illuminati', 5);
      }
      lastMove = await ns.go.makeMove(2, 2);
    }
    let prevboard, prevq = 0;
    while (lastMove.type != 'gameOver') {
      if (lastMove.type == 'pass') {
        let {whiteScore, komi} = ns.go.getGameState();
        if (whiteScore == komi) {
          await ns.go.passTurn();
          break;
        }
      }
      let seen = ns.go.getMoveHistory().map((x, i) => zobristHash(x, false));

      let q, s, moves;
      try {
        [q, s, moves] = await getMoves(ns.go.getBoardState(), seen);
      } catch {
        return;
      }
      ns.print('Q: ', q, ' S: ', s);
      let moved = false;
      let passq = 0;
      if (q < prevq - 4) {
        ns.tprint('blunder detected');
        ns.tprint(prevboard);
        ns.tprint(ns.go.getBoardState())
      }
      prevboard = ns.go.getBoardState();
      prevq = q;
      // sweeps a bug under the carpet (fails to recognize some moves as illegal sometimes?)
      if (q < 2) {
        lastMove = await ns.go.passTurn();
        continue;
      }
      for (let [h, n, q, m] of moves) {
        if (!m) {
          passq = q;
          continue;
        }
        if (n && q > passq - 2) {
          try {
            lastMove = await ns.go.makeMove(...m);
          } catch {
            continue;
          }
          moved = true;
          break;
        }
      }
      if (!moved) {
        lastMove = await ns.go.passTurn();
      }
    }
    let { blackScore, whiteScore } = ns.go.getGameState();
    if (blackScore > whiteScore) wins++;
    ns.print(blackScore, ' - ', whiteScore)
    ns.ui.setTailTitle(wins + ' wins of ' + (i + 1) + ' games')
    await ns.asleep(0);
  }
  ns.print('Average game time was ', (Date.now() - start) / 100000, 'seconds');
}
