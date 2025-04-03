const BITMASKS =
  [1121947061, -235620891, -1245654258, 1684021568, 318433024, 474387246, 1950062581, -1038157227,
    -1353011405, -1931192636, 702711060, 164763225, -1783585172, -1285514913, 13199692, -1396957377,
    1746731144, 597425358, -1732514649, -1038566413, 1251584800, 1997893375, -342518611, -1915490013,
    731662747, -356166246, 1533270580, 2047043223, -866263845, -39925864, 2047861143, 1103388812,
    -1429044189, -1726474267, 1769725877, 1425886793, 1496551369, -1632216025, 388590241, -804944460,
    -70732422, 758952205, -1783521913, -579774516, 838934517, 2140282913, 958249961, -1593926963,
    -2036987585, -331123051, -678051717, 1100229620, 42729513, -406964662, 895248032, 1701086831,
    1400635142, 683917629, -289891285, -383902369, -247541010, 207029544, -1497117768, -835669558,
    11048400, -14566044, -535011520, -199448873, 1435577141, 118838471, 1850346361, 2135724332,
    609115498, -489249676, -1877534802, -1524937040, -634453793, 122874352, -2044285513, 530766909,
    -751874154, 201443457, 1078015550, -40831388, 2104466049, -939139694, 1264123644, -1769008340,
    -1895039578, 852771158, -106431607, 622855388, 1512807437, -1859265827, -1030685420, -677039607,
    -612539235, -134063382, -162874709, 1655271897, 584327788, -1177163020, 250512939, 107390050,
    1510369701, -896466386, -783197820, -1283444655, 2015358773, -1369345076, -1323575857, 813831519,
    540377155, -1563882907, -1093080711, 1770161131, 114072739, 1011235750, -1096259575, -1341445274,
    -821262716, -5889022, -474203993, 311938333, -1881003010, 383681047, -330174997, -1407982162,
    -906530796, 1024569777, 185744639, 429628255, 1959395573, -565280511, 554849815, -1829468196,
    -572965923, 900514293, 2017751072, -1852163399, 1492891234, 1456696383, 1416750004, 1778594769,
    166097775, 752838046, 2119127478, 112107944, -1111629173, -603612721, -1693830410, -185246104,
    1644233499, -1285458100, 1559457819, 963737773, 231598032, -2114753429, -894239346, 641116122,
    1361876091, 1187592035, 1611137007, -135464797, 1444859523, -1215306451, 1045642431, 903793272,
    1149227423, 1780362551, -1340134851, -872529628, 1627327286, -1755913351, -245823218, 1022707125,
    894784753, 83718938, -876769547, -1397281848, -1992811299, -1329829333, -823874321, 808000412,
    -1706360374, 127638619, 2144087236, 1568229194, -129032522, -281355883, 177160507, 5507275, 2075217378,
    503516107, -25472456, -1322983005, 1320408288, -1721721844, 669688032, 421544527, -130732914, 319626980,
    -1577680490, -729034291, 196312573, -622326004, -475704474, 869079829, -1607726111, -1470944392,
    -636014427, 1374657351, 140245511, 1738731900, 283354622, 991952792, -1421601790, -1038432859,
    -1468627325, 279668213, 1743940798, -1284568951, -2128667732, -1528954834, 420384121, 1779608239,
    -1423135055, 1600641596, 2071829534, 1395183598, -764482315, -579803719, -1317500291, 1767471370,
    -816217297, 791455762, 1705007115, 648807896, -485560255, -1850457687, -230001150, -906792363,
    1699617725, -1959057072, 1038780071, 726833723, 1614304237, -27141525, 1949311700, -1198325402,
    546670296, -1748426464, 1083894511, -191505592, -570633772, -77576027, -1425152484, -1045454812,
    612848540, -1428820576, 954075393, -1241374554, 1434738358, 846381219, -989709754, -200864505,
    -93707625, 2100626406, 1364335788, -431420267, 1822259895, 879735933, 405194113, -812605240, -795666161,
    -39906618, -405464938, -2049827264, -1843592479, -1420651398, 1639736241, -1388767792, -1665232479,
    -151674225, -985511841, -969421588, -710374738, 1490192790, -1770983113, 1645137497, -1382571084,
    1954415223, 70344891, 858595718, 1877675953, -619293680, -110379108, -1841493407, -1479066982,
    -1100642792, -1601240973, 164606766, 1021946923, 1855778743, 1017475549, -520995226, 851220189,
    -1562754590, -278044161, 82273170, 1513415267, 743533029, -2124633873, 1163345616, 2003673190,
    1005644563, 563973594, 1638917111, 398662063, 1986440960, -804685212, -2053346488, -325084045,
    1378963830, 964916858, -1178578143, -827379298, -418959327, -483208554, 1676769743, 631151178,
    1094098190, -1048198581, 2111835898, 1781078700, 225560373, 291111916, 1841104355, 46836732,
    1268347209, -1570971433, 1880134195, -1504731159, -814933709, -1502708577, -1349982578, 1191264669,
    303123189, 1713880934, 1978503939, -1020298590, 1606511314, 1153923248, -1273284001, -1149272680,
    -1769484236, 33292632, -1747415806, 1126262954, -866737358, -871278713, -410449712];

const BOARD_SIZE = 5;

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
const ANALYSIS_MODE = false;

// If true, does not do playouts when the child node has
// more playouts than the edge visit count (due to
// transpositions)
const SUPPRESS_TRANSPOSITION = true;

/** @param {string[][] | string[]} board
  * @param {boolean} blackToPlay */
function zobristHash(board, blackToPlay) {
  var n = 0;
  for (var x = 0; x < BOARD_SIZE; ++x) {
    for (var y = 0; y < BOARD_SIZE; ++y) {
      if (board[x][y] == 'O')
        n ^= BITMASKS[2 * (BOARD_SIZE * x + y)];
      if (board[x][y] == 'X')
        n ^= BITMASKS[2 * (BOARD_SIZE * x + y) + 1];
    }
  }
  if (blackToPlay) {
    n ^= BITMASKS[2 * BOARD_SIZE * BOARD_SIZE];
  }
  return n;
}

/** @param {Int8Array} board
  * @param {boolean} blackToPlay */
function zobristHashLinear(board, blackToPlay) {
  // Mild TODO: The Zobrist hash should actually consider
  // whether the last move was pass, because we don't
  // want to conflate those game states.
  var n = 0;
  for (var pos = 0; pos < BOARD_SIZE * BOARD_SIZE; ++pos) {
    if (board[pos] == 1) {
      n ^= BITMASKS[2*pos + 1];
    } else if (board[pos] == 2) {
      n ^= BITMASKS[2*pos];
    }
  }
  if (blackToPlay) {
    n ^= BITMASKS[2 * BOARD_SIZE * BOARD_SIZE];
  }
  return n;
}

/**
 * @param {string[][]} board
 * @param {Int8Array} buf optional buffer to store linear board into
 * @return {Int8Array} linearized board (buf if provided, newly allocated otherwise)
 */
function linearizeBoard(board, buf) {
  buf ??= new Int8Array(BOARD_SIZE * BOARD_SIZE);
  for (let x = 0; x < BOARD_SIZE; ++x) {
    for (let y = 0; y < BOARD_SIZE; ++y) {
      switch (board[x][y]) {
        case '#': buf[BOARD_SIZE * x + y] = -1; break;
        case '.': buf[BOARD_SIZE * x + y] = 0; break;
        case 'X': buf[BOARD_SIZE * x + y] = 1; break;
        case 'O': buf[BOARD_SIZE * x + y] = 2; break;
        default: throw new Error('Unrecognized character on board (wrong board size?)');
      }
    }
  }
  return buf;
}

/**
 * @param {Int8Array} linearBoard
 * @return {string[][]} delinearized board
 */
function deLinearizeBoard(linearBoard) {
  let board = [];
  for (let x = 0; x < BOARD_SIZE; ++x) {
    board.push([]);
    for (let y = 0; y < BOARD_SIZE; ++y) {
      switch (linearBoard[BOARD_SIZE * x + y]) {
        case -1: board[x][y] = '#'; break;
        case 0: board[x][y] = '.'; break;
        case 1: board[x][y] = 'X'; break;
        case 2: board[x][y] = 'O'; break;
        default: throw new Error('Unrecognized character on board (wrong board size?)');
      }
    }
  }
  return board;
}

/** 
 * @param {Int8Array} board linearized board to analyze
 * @param {Int8Array} buffer output buffer for liberties
 */
/** 
 * @param {Int8Array} board linearized board to analyze
 * @param {Int8Array} buffer output buffer for liberties
 */
function getLibertiesLinear(board, liberties) {
  liberties.fill(-1);
  var seen = new Int8Array(BOARD_SIZE * BOARD_SIZE);
  function check(idx) {
    if (!seen[idx]) {
      seen[idx] = 1;
      if (board[idx] == c) {
        group.push(idx);
      } else if (board[idx] == 0) {
        l++;
      }
    }
  }
  for (var pos = 0; pos < BOARD_SIZE * BOARD_SIZE; ++pos) {
    if (liberties[pos] != -1 || board[pos] <= 0) continue;
    var l = 0;
    var group = [pos];
    var c = board[pos];
    seen.fill(0);
    seen[pos] = 1;
    // hopefully this gets inlined? otherwise unroll it manually
    for (var i = 0; i < group.length; ++i) {
      var x = group[i];
      if (x % BOARD_SIZE > 0) check(x - 1);
      if ((x + 1) % BOARD_SIZE) check(x + 1);
      if (x >= BOARD_SIZE) check(x - BOARD_SIZE);
      if (x < BOARD_SIZE * (BOARD_SIZE - 1)) check(x + BOARD_SIZE);
    }
    for (var g of group) {
      liberties[g] = l;
    }
  }
}

/** 
 * @param {Int8Array} position 
 * @param {boolean} immediate if true, scores the board immediately (without removing dead stones)
 * */
function scoreTerminalLinear(board, immediate) {
  let territory = getTerritory(board);
  let bs = 0, ws = 0, es = 0;
  if (immediate) {
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; ++i) {
      if (board[i] == 0) {
        if (territory[i] == 1) {
          bs++;
        } else if (territory[i] == 2) {
          ws++;
        }
      } else if (board[i] == 1) {
        bs++;
      } else if (board[i] == 2) {
        ws++;
      }
    }
  } else {
    for (let x of territory) {
      if (x == 0) es++;
      if (x == 1) bs++;
      if (x == 2) ws++;
    }
  }
  if (ws == 0) return es + bs;
  if (bs == 0) return 0;
  return bs + es / 2;
}

/** 
 * @param {Int8Array} board
 * @param {Int8Array} nextBoard
 * @param {Int8Array} liberties
 * @param {number} x
 * @param {number} y
 * @param {boolean} blackToPlay
 */
function addMoveLinear(board, nextBoard, liberties, x, y, blackToPlay) {
  if (board[BOARD_SIZE * x + y] != 0) return false;
  /** @type {[number, number][]} */
  let toCapture = [];
  let legal = false;
  for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    if (x + dx == -1 || x + dx == BOARD_SIZE || y + dy == -1 || y + dy == BOARD_SIZE) continue;
    let off = BOARD_SIZE * (x + dx) + y + dy;
    switch (board[off]) {
      case 0:
        legal = true;
        break;
      case 1:
        if (blackToPlay) {
          if (liberties[off] > 1) {
            legal = true;
          }
        } else {
          if (liberties[off] == 1) {
            legal = true;
            toCapture.push([x + dx, y + dy]);
          }
        }
        break;
      case 2:
        if (blackToPlay) {
          if (liberties[off] == 1) {
            legal = true;
            toCapture.push([x + dx, y + dy]);
          }
        } else {
          if (liberties[off] > 1) {
            legal = true;
          }
        }
    }
  }
  if (!legal) return false;
  nextBoard.set(board);
  nextBoard[BOARD_SIZE * x + y] = blackToPlay ? 1 : 2;
  for (let i = 0; i < toCapture.length; ++i) {
    let [xx, yy] = toCapture[i];
    nextBoard[BOARD_SIZE * xx + yy] = 0;
    for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      if (xx + dx == -1 || xx + dx == BOARD_SIZE || yy + dy == -1 || yy + dy == BOARD_SIZE) continue;
      let off = BOARD_SIZE * (xx + dx) + (yy + dy);

      if (nextBoard[off] == (blackToPlay ? 2 : 1)) {
        nextBoard[off] = 0;
        toCapture.push([xx + dx, yy + dy]);
      }
    }
  }
  return true;
}

function getTerritory(board) {
  let checked = new Int8Array(BOARD_SIZE * BOARD_SIZE);
  let controlled = new Int8Array(board);
  for (let x = 0; x < BOARD_SIZE; ++x) {
    for (let y = 0; y < BOARD_SIZE; ++y) {
      let off = BOARD_SIZE * x + y;
      let chainID = off + 1;
      if (checked[off] || board[off] < 1) continue;
      let chain = [[x, y]];
      let chainColor = board[off];
      checked[off] = chainID;
      let liberties = [];
      for (let i = 0; i < chain.length; ++i) {
        let [xx, yy] = chain[i];
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (xx + dx == -1 || xx + dx == BOARD_SIZE || yy + dy == -1 || yy + dy == BOARD_SIZE) continue;
          let offf = BOARD_SIZE * (xx + dx) + (yy + dy);
          if (board[offf] == chainColor) {
            if (checked[offf] !== 0) continue;
            chain.push([xx + dx, yy + dy]);
            checked[offf] = chainID;
          } else if (board[offf] == 0) {
            liberties.push([xx + dx, yy + dy]);
          }
        }
      }
      let hasInternalLiberty = false;
      for (let [x, y] of liberties) {
        if (checked[BOARD_SIZE * x + y] !== 0) {
          if (controlled[BOARD_SIZE * x + y] == chainColor) hasInternalLiberty = true;
          continue;
        }
        let libertyID = BOARD_SIZE * x + y + 1;
        checked[BOARD_SIZE * x + y] = libertyID;
        let eye = [[x, y]];
        let isControlled = true;
        for (let i = 0; i < eye.length; ++i) {
          let [xx, yy] = eye[i];
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            if (xx + dx == -1 || xx + dx == BOARD_SIZE || yy + dy == -1 || yy + dy == BOARD_SIZE) continue;
            let offf = BOARD_SIZE * (xx + dx) + (yy + dy);
            if (board[offf] == 3 - chainColor) {
              isControlled = false;
            }
            if (board[offf] == 0) {
              if (checked[offf] !== 0) continue;
              checked[offf] = libertyID;
              eye.push([xx + dx, yy + dy]);
            }
          }
        }
        if (!isControlled || eye.length > 11) continue;
        for (let [xx, yy] of eye) {
          controlled[BOARD_SIZE * xx + yy] = chainColor;
        }
        hasInternalLiberty = true;
      }
      if (!hasInternalLiberty) {
        for (let [xx, yy] of chain) {
          controlled[BOARD_SIZE * xx + yy] = 0;
        }
      }
    }
  }
  return controlled;
}

function fastPlayoutLinear(board, blackToPlay, history) {
  let ab = new ArrayBuffer(4 * BOARD_SIZE * BOARD_SIZE);
  let linearBoard = new Int8Array(ab, 0, BOARD_SIZE * BOARD_SIZE),
    nextBoard = new Int8Array(ab, BOARD_SIZE * BOARD_SIZE, BOARD_SIZE * BOARD_SIZE),
    liberties = new Int8Array(ab, 2 * BOARD_SIZE * BOARD_SIZE, BOARD_SIZE * BOARD_SIZE),
    nextLiberties = new Int8Array(ab, 3 * BOARD_SIZE * BOARD_SIZE, BOARD_SIZE * BOARD_SIZE);
  linearBoard.set(board);
  getLibertiesLinear(linearBoard, liberties);
  let lastPassed = false;
  let maxIters = 1.5 * BOARD_SIZE * BOARD_SIZE;
  function check(idx) {
    if (linearBoard[idx] == 0) {
      legal = true;
      fillsEye = false;
    } else if (linearBoard[idx] > 0) {
      if (blackToPlay ^ (linearBoard[idx] == 2)) {
        if (liberties[idx] == 1) {
          fillsEye = false;
        } else {
          legal = true;
        }
      } else {
        fillsEye = false;
        if (liberties[idx] == 1) {
          legal = true;
        }
      }
    }
  }

  for (let i = 0; i < maxIters; ++i) {
    // pick a non-dumb move at random, defaulting to pass
    // (a move is dumb if it fills in an eye for no reason)

    // TODO: it's potentially better to use RAVE for the playout policy
    let moves = [];
    for (let pos = 0; pos < BOARD_SIZE * BOARD_SIZE; ++pos) {
      if (linearBoard[pos]) continue;
      var legal = false;
      var fillsEye = true;
      if (pos % BOARD_SIZE > 0) check(pos - 1);
      if ((pos + 1) % BOARD_SIZE) check(pos + 1);
      if (pos >= BOARD_SIZE) check(pos - BOARD_SIZE);
      if (pos < BOARD_SIZE * (BOARD_SIZE - 1)) check(pos + BOARD_SIZE);

      if (legal && !fillsEye) moves.push(pos);
    }

    while (moves.length) {
      // Pick a move at random
      let i = Math.floor(Math.random() * moves.length);
      let pos = moves[i];

      let legal = addMoveLinear(linearBoard, nextBoard, liberties, (pos / BOARD_SIZE) | 0, (pos % BOARD_SIZE), blackToPlay);
      if (!legal) {
        moves.splice(i, 1);
        console.error('illegal move attempted in fastPlayoutLinear');
        continue;
      }
      let hash = zobristHashLinear(nextBoard, false);
      if (history.has(hash)) {
        moves.splice(i, 1);
        continue;
      }
      if (nextLiberties[pos] == 1) {
        // it's okay to either sac a lone stone or extend from
        // a stone that was already in atari (many eye destruction
        // tactics look like that), but killing a group that wasn't under
        // atari is silly
        let alreadyDying = true;
        if (pos % BOARD_SIZE > 0) {
          if (board[pos - 1] == (blackToPlay ? 1 : 2) && (liberties[pos - 1] > 1)) {
            alreadyDying = false;
          }
        }
        if ((pos + 1) % BOARD_SIZE) {
          if (board[pos + 1] == (blackToPlay ? 1 : 2) && (liberties[pos + 1] > 1)) {
            alreadyDying = false;
          }
        }
        if (pos >= BOARD_SIZE) {
          if (board[pos - BOARD_SIZE] == (blackToPlay ? 1 : 2) && (liberties[pos - BOARD_SIZE] > 1)) {
            alreadyDying = false;
          }
        }
        if (pos < BOARD_SIZE * (BOARD_SIZE - 1)) {
          if (board[pos + BOARD_SIZE] == (blackToPlay ? 1 : 2) && (liberties[pos + BOARD_SIZE] > 1)) {
            alreadyDying = false;
          }
        }
        if (!alreadyDying) {
          moves.splice(i, 1);
          continue;
        }
      }
      getLibertiesLinear(nextBoard, nextLiberties);
      lastPassed = false;
      break;
    }
    if (!moves.length) {
      nextBoard.set(linearBoard);
      if (lastPassed) break;
      lastPassed = true;
    }
    if (!lastPassed)
      [nextBoard, linearBoard, nextLiberties, liberties] = [linearBoard, nextBoard, liberties, nextLiberties];
    if (blackToPlay) {
      if (!linearBoard.includes(2) && i >= 2) {
        break;
      }
    } else {
      if (!linearBoard.includes(1) && i >= 2) {
        break;
      }
    }
    blackToPlay = !blackToPlay;
    history.add(zobristHashLinear(linearBoard, false));
  }
  return scoreTerminalLinear(linearBoard, false);
}

function moveName(x, y) {
  return 'ABCDEFGHJKLMNOPQRSTUVWXYZ'[x] + (y + 1);
}

/**
 * @param {Int8Array} board
 */
function countWhiteEyesLinear(board) {
  let eyeCount = 0;
  let checked = new Int8Array(BOARD_SIZE * BOARD_SIZE);
  for (let x = 0; x < BOARD_SIZE; ++x) {
    for (let y = 0; y < BOARD_SIZE; ++y) {
      let off = BOARD_SIZE * x + y;
      let chainID = off + 1;
      if (checked[off] || board[off] != 2) continue;
      let chain = [[x, y]];
      checked[5 * x + y] = chainID;
      let liberties = [];
      for (let i = 0; i < chain.length; ++i) {
        let [xx, yy] = chain[i];
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (xx + dx == -1 || xx + dx == BOARD_SIZE || yy + dy == -1 || yy + dy == BOARD_SIZE) continue;
          let offf = BOARD_SIZE * (xx + dx) + (yy + dy);
          if (checked[offf] !== 0) continue;
          if (board[offf] == 2) {
            chain.push([xx + dx, yy + dy]);
            checked[offf] = chainID;
          } else if (board[offf] == 0) {
            liberties.push([xx + dx, yy + dy]);
          }
        }
      }
      for (let [x, y] of liberties) {
        if (checked[BOARD_SIZE * x + y] !== 0) continue;
        checked[BOARD_SIZE * x + y] = chainID;
        let eye = [[x, y]];
        let toCheck = [];
        let isEye = true;
        for (let i = 0; i < eye.length; ++i) {
          let [xx, yy] = eye[i];
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            if (xx + dx == -1 || xx + dx == BOARD_SIZE || yy + dy == -1 || yy + dy == BOARD_SIZE) continue;
            let offf = BOARD_SIZE * (xx + dx) + (yy + dy);
            if (board[offf] == 1) {
              isEye = false;
            }
            if (board[offf] == 0) {
              if (checked[offf] !== 0) continue;
              checked[offf] = chainID;
              eye.push([xx + dx, yy + dy]);
            }
            if (board[offf] == 2) {
              if (checked[offf] != chainID) {
                // recheck them later with the chain surround logic
                toCheck.push([xx + dx, yy + dy]);
              }
            }
          }
        }
        if (!isEye || eye.length > 11) continue;
        let seen = [];
        h: for (let i = 0; i < toCheck.length; ++i) {
          let [xx, yy] = toCheck[i];
          seen[BOARD_SIZE * xx + yy] = true;
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            if (xx + dx == -1 || xx + dx == BOARD_SIZE || yy + dy == -1 || yy + dy == BOARD_SIZE) continue;
            let offf = BOARD_SIZE * (xx + dx) + (yy + dy);
            if (board[offf] == -1) continue;
            if (board[offf] == 1) {
              isEye = false;
              break h;
            }
            if (board[offf] == 2 &&
              checked[offf] == chainID) {
              continue;
            }
            if (seen[BOARD_SIZE * (xx + dx) + (yy + dy)]) continue;
            seen[BOARD_SIZE * (xx + dx) + (yy + dy)] = true;
            toCheck.push([xx + dx, yy + dy]);
          }
        }
        if (isEye) {
          eyeCount++;
        } else {
          for (let [x, y] of eye) checked[BOARD_SIZE * x + y] = 0;
        }
      }
    }
  }
  return eyeCount;
}

class MCGSEdge {
  constructor(hash, board, pos, weight) {
    /** @type {number} */
    this.hash = hash;
    /** @type {number} */
    this.pos = pos;
    /** @type Int32Array */
    this.board = board;
    /** @type {number} */
    this.weight = weight;
    /** @type {number} */
    this.visits = 0;
    /** @type {MCGSNode | null} */
    this.nn = null;
    /** @type {number} */
    this.value = 0;
  }
}

class MCGSNode {
  /**
   * @param {Int8Array} board
   * @param {boolean} blackToPlay
   * @param {Map<number, MCGSNode>} map
   * @param {Set<number>} history hashes of previous game states, used for superko detection
   */
  constructor(board, blackToPlay, map, history) {
    this.board = board;
    this.blackToPlay = blackToPlay;
    this.hash = zobristHashLinear(board, blackToPlay);

    let liberties = new Int8Array(BOARD_SIZE * BOARD_SIZE);
    getLibertiesLinear(board, liberties);

    /** @type MCGSEdge[] */
    this.children = [new MCGSEdge(this.hash ^ BITMASKS[2 * BOARD_SIZE * BOARD_SIZE], board, -1, 0)];

    let whiteEyes = (USE_AI_TWEAKS && !blackToPlay) && countWhiteEyesLinear(board);
    let territory = getTerritory(board);
    for (let x = 0; x < BOARD_SIZE; ++x) {
      for (let y = 0; y < BOARD_SIZE; ++y) {
        let nb = new Int8Array(BOARD_SIZE * BOARD_SIZE);
        let legal = addMoveLinear(board, nb, liberties, x, y, blackToPlay);
        if (!legal) continue;

        let hash = zobristHashLinear(nb, !blackToPlay);
        let weight = 1;
        if (USE_AI_TWEAKS) {
          if (!blackToPlay) {
            let issurround = false;
            let isatari = false;
            let iscapture = false;
            let isdefend = false;
            let isnobi = false;
            let bigatari = false;
            let white_or_offline_neighbors = 0;
            let emptycount = 0;
            let hasneighbor = false;
            let neighborliberties = 1;
            for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
              if (x + dx == -1 || x + dx == BOARD_SIZE || y + dy == -1 || y + dy == BOARD_SIZE) {
                white_or_offline_neighbors++;
                continue;
              }
              let off = BOARD_SIZE * (x + dx) + (y + dy);
              if (board[off] == -1) {
                white_or_offline_neighbors++;
              }
              if (board[off] == 1) {
                hasneighbor = true;
                if (liberties[off] <= 4) issurround = true;
                if (liberties[off] == 2) {
                  isatari = true;
                  if (!bigatari) {
                    // Check whether this group is large
                    let seen = [];
                    let group = [[x + dx, y + dy]];
                    let groupliberties = [];
                    for (let i = 0; i < group.length; ++i) {
                      let [x, y] = group[i];
                      for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                        if (x + dx == -1 || x + dx == BOARD_SIZE || y + dy == -1 || y + dy == BOARD_SIZE) continue;
                        let off = BOARD_SIZE * (x + dx) + (y + dy);
                        if (board[off] == 1) {
                          if (seen[off]) continue;
                          seen[off] = 1;
                          group.push([x + dx, y + dy]);
                        }
                        if (board[off] == 0) {
                          if (seen[off]) continue;
                          seen[off] = 1;
                          groupliberties.push([x + dx, y + dy]);
                        }
                      }
                    }
                    if (group.length >= 3) {
                      if (Math.abs(groupliberties[0][0] - groupliberties[1][0]) +
                        Math.abs(groupliberties[0][1] - groupliberties[1][1]) == 1) {
                        // big atari only applies if there is one liberty group
                        bigatari = true;
                      }
                    }
                  }
                } else if (liberties[off] == 1) {
                  iscapture = true;
                }
              }
              if (board[off] == 2) {
                hasneighbor = true;
                white_or_offline_neighbors++;
                // it won't play eye moves from a group that has
                // two eyes, but i don't really feel like checking
                let islone = true;
                for (let [ddx, ddy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                  if (x + dx + ddx == -1 || x + dx + ddx == BOARD_SIZE ||
                    y + dy + ddy == -1 || y + dy + ddy == BOARD_SIZE) continue;
                  if (board[BOARD_SIZE * (x + dx + ddx) + y + dy + ddy] == 2) islone = false;
                }
                if (!islone) isnobi = true;
                if (liberties[off] == 1) {
                  isdefend = true;
                } else if (liberties[off] > neighborliberties) {
                  neighborliberties = liberties[off];
                }
              }
              if (board[off] == 0) {
                emptycount++;
              }
            }
            let makesEye = false;
            if (!iscapture && !isdefend && isnobi && whiteEyes < 2) {
              let nb = new Int8Array(board);
              nb[BOARD_SIZE * x + y] = 2;
              let newWhiteEyes = countWhiteEyesLinear(nb);
              if (newWhiteEyes > whiteEyes) {
                makesEye = true;
              }
            }

            if (iscapture) {
              weight = 1000;
              if (territory[BOARD_SIZE * x + y] != 1) weight++;
            } else if (isdefend && neighborliberties + emptycount > 2) {
              weight = 800;
              if (territory[BOARD_SIZE * x + y] != 1) weight++;
            } else if (makesEye && isnobi && white_or_offline_neighbors > 1 && emptycount > 0) {
              weight = 600;
              if (territory[BOARD_SIZE * x + y] != 1) weight++;
            } else if (isatari) {
              if (bigatari) {
                weight = 400;
                if (territory[BOARD_SIZE * x + y] != 1) weight++;
              } else {
                let nb = new Int8Array(board);
                nb[BOARD_SIZE * x + y] = 2;
                let nl = new Int8Array(BOARD_SIZE * BOARD_SIZE);
                getLibertiesLinear(nb, nl);
                if (nl[BOARD_SIZE * x + y] > 1) {
                  weight = 400;
                  if (territory[BOARD_SIZE * x + y] != 1) weight++;
                }
              }
            } else {
              // jump (this isn't true on a larger board because of corner
              // moves, but it is true on 3x3)
              if (!hasneighbor && emptycount < 4) { weight = -1; }
              // there's another requirement (won't attack length 2 groups) but
              // it's not that important i think
              if (!issurround && territory[BOARD_SIZE*x + y == 1]) { weight = -1; }
            }
          }
        }
        this.children.push(new MCGSEdge(hash, nb, x * BOARD_SIZE + y, weight));
      }
    }
    map.set(this.hash, this);

    // result of the playout rooted at this position
    this.U = fastPlayoutLinear(this.board, this.blackToPlay, history);

    // Playouts going though this node
    this.N = 1;

    // Total utility of playouts going through this node
    this.S = this.U;

    // Total square of utility of playouts going through this node
    this.SS = this.U ** 2;
  }

  getcPUCT() {
    const PRIOR_MULTIPLIER = 10;
    return (PRIOR_MULTIPLIER * Math.sqrt(0.75 * BOARD_SIZE * BOARD_SIZE) +
      this.N * Math.max(0.1,
        Math.sqrt((this.SS) / (this.N) - (this.S / this.N) ** 2))) / (this.N + PRIOR_MULTIPLIER);
  }
}

/** 
 * @param {string[] | string[][]} board 
 * @param {boolean} lp
 * @param {number[]} seen_hashes
 */
function getMoves(board, lp, seen_hashes = []) {
  let b = linearizeBoard(board);

  let map = new Map();
  let root = new MCGSNode(b, true, map, new Set([seen_hashes]));
  for (let i = 0; i < PLAYOUTS; ++i) {
    let seen = new Set(seen_hashes);
    let lastPassed = lp;
    seen.add(zobristHashLinear(b, false));
    let path = [root];
    while (true) {
      let ln = path.at(-1);
      let bestScore = -Infinity;
      let nh = ln.children[0];
      let maxweight = 1;
      for (let c of ln.children) {
        if (c.weight > maxweight) {
          if (seen.has(c.hash ^ (ln.blackToPlay ? 0 : BITMASKS[2 * BOARD_SIZE * BOARD_SIZE])) && c.pos != -1) {
          //if (seen.has(zobristHashLinear(c.board, false)) && c.pos != -1) {
            continue;
          }
          maxweight = c.weight;
        }
      }

      if (lastPassed) {
        ln.DP ??= ['t', 0, null, null, 1, scoreTerminalLinear(ln.board, true)];
        let score = (ln.blackToPlay ? 1 : -1) * ln.DP[5];
        // no exploration factor because we know terminal nodes have no variance
        if (score > bestScore) {
          bestScore = score;
          nh = ln.DP;
        }
      }

      for (let c of ln.children) {
        if (seen.has(c.hash ^ (ln.blackToPlay ? 0 : BITMASKS[2 * BOARD_SIZE * BOARD_SIZE])) && c.pos != -1) {
        // if (seen.has(zobristHashLinear(c.board, false)) && c.pos != -1) {
          continue;
        }

        if (lastPassed && c.pos == -1) continue;
        // eagerly update cached child pointer
        c.nn ??= map.get(c.hash);
        let stddev = c.nn?.getcPUCT?.() ?? BOARD_SIZE * BOARD_SIZE;
        let q = c.nn ? c.nn.S / c.nn.N : ln.S / ln.N;
        let score =
          ((ln.blackToPlay ? 1 : -1) *
            q +
            // ((c.pos != -1) ? 1 : 0.25) *  // penalize pass a bit
            (EXPLORATION_PARAMETER *
              stddev
              * Math.sqrt(ln.N) / (1 + c.visits)));
        if (USE_AI_TWEAKS && !ln.blackToPlay) {
          if (c.pos != -1 && c.weight < maxweight - 1) continue;
          if (c.pos == -1 && maxweight > 1 && maxweight % 10 == 1) {
            // marker for priority moves that aren't culled due to being in black territory
            // white will not pass if it has such a move available.
            continue;
          }
        }
        if (score > bestScore) {
          bestScore = score;
          nh = c;
        }
      }

      // Update node statistics
      ln.N++;
      if (nh == ln.DP) {
        ln.DP[1]++;
        break;
      }
      nh.visits++;
      lastPassed = (nh.pos == -1);

      seen.add(zobristHashLinear(nh.board, false));
      if (nh.nn) {
        if (SUPPRESS_TRANSPOSITION) {
          if (nh.visits <= nh.nn.N) {
            break;
          }
        }
        path.push(nh.nn);
      } else {
        nh.nn = new MCGSNode(nh.board, !ln.blackToPlay, map, seen);
        break;
      }
    }
    // See https://github.com/lightvector/KataGo/blob/master/docs/GraphSearch.md
    for (let i = path.length; i-- > 0;) {
      let node = path[i];
      let s = 0, ss = 0;
      for (let c of node.children) {
        let cn = c.nn ??= map.get(c.hash);
        if (!cn) continue;
        s += c.visits * cn.S / cn.N;
        ss += c.visits * cn.SS / cn.N;
      }
      if (node.DP) {
        s += node.DP[1] * node.DP[5];
        ss += node.DP[1] * node.DP[5] * node.DP[5];
      }
      node.S = (node.U + s);
      node.SS = (node.U * node.U + ss);
    }
  }
  if (lp) {
    // white passed last move; DP replaces the pass edge
    root.children[0].visits = root.DP[1];
    root.children[0].value = root.DP[5];
  }
  let children = root.children.toSorted((x, y) => y.visits - x.visits);
  for (let c of children) {
    if (c.nn) {
      c.value = c.nn.S / c.nn.N;
    }
  }
  if (ANALYSIS_MODE) {
    let refutation = children[0].nn?.children;
    if (refutation) {
      refutation.sort((x, y) => y.visits - x.visits);
      for (let r of refutation) {
        console.log(r.pos == -1 ? 'pass' : moveName(0|(r.pos/BOARD_SIZE),r.pos%BOARD_SIZE), r.visits, r.weight);
        console.log(r.nn?.S / r.nn?.N)
      }
    }
  }
  return [root.S / root.N, root.getcPUCT(), children];
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
  let getMoves = function (d, l, m) {
    return new Promise((res, rej) => {
      ns.atExit(rej, 'worker_promise')
      resolve = res;
      worker.postMessage([d, l, m]);
    });
  }
  if (ANALYSIS_MODE) {
    ns.clearLog()
    ns.ui.setTailTitle('Analysis mode')

    /*
    // analyze current game state
    let seen = ns.go.getMoveHistory().map(x => zobristHash(x, false));
    let [q, s, moves] = await getMoves(ns.go.getBoardState(), false, seen);
    ns.go.analysis.clearAllPointHighlights();
    for (let i = 0; i < moves.length; ++i) {
      let e = moves[i];

      if (e.pos != -1) {
        let x = (e.pos/BOARD_SIZE)|0, y = e.pos%BOARD_SIZE;
        let color = '#00FF00';
        if (i > 0) color = '#AACC00';
        if (i > 5) color = 'none';
        ns.go.analysis.highlightPoint(x, y, color, (e.value-q).toFixed(2));
      }
    }
    //*/

    //* analyze board
    let bord = ["OOO..","XO.X.","XXOO.",".....","....."];
    let seen = [];
    let [q, s, moves] = await getMoves(bord, true, seen);
    ns.print('Q: ', q, ' S: ', s);
    for (let e of moves) {
      let m = e.pos;
      ns.print((m>-1) ? moveName((m/BOARD_SIZE)|0, m%BOARD_SIZE) : 'pass',
      ' N = ', e.visits, ' Q = ', e.value);
      //if (seen.includes(h) && m) {
      //  ns.print('illegal due to superko rule')
      //}
    }
    //*/
    return;
  }

  let start = Date.now();
  let wins = 0;
  let games = 1000;
  for (let i = 0; i < games; ++i) {
    let lastMove = {};
    ns.go.resetBoardState('Illuminati', BOARD_SIZE);
    if (RESET_FOR_TENGEN) {
      while (ns.go.getBoardState()[2][2] != '.') {
        ns.go.resetBoardState('Illuminati', BOARD_SIZE);
      }
      lastMove = await ns.go.makeMove(2, 2);
    }
    let prevboard, prevq = 0;
    while (lastMove.type != 'gameOver') {
      if (lastMove.type == 'pass') {
        let { whiteScore, komi } = ns.go.getGameState();
        if (whiteScore == komi) {
          await ns.go.passTurn();
          break;
        }
      }
      let seen = ns.go.getMoveHistory().map(x => zobristHash(x, false));

      let q, s, moves;
      try {
        [q, s, moves] = await getMoves(ns.go.getBoardState(), lastMove.type == 'pass', seen);
      } catch {
        return;
      }
      ns.print('Q: ', q, ' S: ', s);
      let moved = false;
      if (q < prevq - 4) {
        ns.tprint('blunder detected ' + prevq + ' -> ' + q);
        ns.tprint(prevboard);
        ns.tprint(ns.go.getBoardState())
      }
      prevboard = ns.go.getBoardState();
      prevq = q;
      for (let e of moves) {
        if (e.pos == -1) {
          break;
        }
        if (e.visits) {
          try {
            lastMove = await ns.go.makeMove((e.pos/BOARD_SIZE)|0, e.pos%BOARD_SIZE);
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
  ns.print('Average game time was ', (Date.now() - start) / (1000 * games), 'seconds');
}
