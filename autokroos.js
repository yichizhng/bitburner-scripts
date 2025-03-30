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
  for (var x = 0; x < BOARD_SIZE; ++x) {
    for (var y = 0; y < BOARD_SIZE; ++y) {
      if (board[BOARD_SIZE * x + y] == 2)
        n ^= BITMASKS[2 * (BOARD_SIZE * x + y)];
      if (board[BOARD_SIZE * x + y] == 1)
        n ^= BITMASKS[2 * (BOARD_SIZE * x + y) + 1];
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
function getLibertiesLinear(board, liberties) {
  liberties.fill(-1);
  let seen = new Int8Array(BOARD_SIZE * BOARD_SIZE);
  for (let x = 0; x < BOARD_SIZE; ++x) {
    for (let y = 0; y < BOARD_SIZE; ++y) {
      if (liberties[BOARD_SIZE * x + y] == -1 && (board[BOARD_SIZE * x + y] > 0)) {
        let l = 0;
        let group = [[x, y]];
        seen.fill(0);
        seen[BOARD_SIZE * x + y] = 1;
        for (let i = 0; i < group.length; ++i) {
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            let xx = group[i][0] + dx, yy = group[i][1] + dy;
            if (xx == -1 || xx == BOARD_SIZE || yy == -1 || yy == BOARD_SIZE) continue;
            if (seen[BOARD_SIZE * xx + yy]) continue;
            seen[BOARD_SIZE * xx + yy] = 1;
            if (board[BOARD_SIZE * xx + yy] == board[BOARD_SIZE * x + y]) {
              group.push([xx, yy])
            } else if (board[BOARD_SIZE * xx + yy] == 0) {
              l++;
            }
          }
        }
        for (let [xx, yy] of group) {
          liberties[BOARD_SIZE * xx + yy] = l;
        }
      }
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

/**
 * @param {Int8Array} board
 * @param {boolean} blackToPlay
 * @param {Set<number>} history
 */
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
  for (let i = 0; i < maxIters; ++i) {
    // pick a non-dumb move at random, defaulting to pass
    // (a move is dumb if it fills in an eye for no reason)
    let moves = [];
    for (let x = 0; x < BOARD_SIZE; ++x) {
      for (let y = 0; y < BOARD_SIZE; ++y) {
        if (board[BOARD_SIZE * x + y] != 0) continue;
        let fillsEye = true;
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (x + dx == -1 || x + dx == BOARD_SIZE || y + dy == -1 || y + dy == BOARD_SIZE) continue;
          let off = BOARD_SIZE * (x + dx) + (y + dy);
          if (liberties[off] == 1) {
            fillsEye = false;
          }
          if (linearBoard[off] == 0) {
            fillsEye = false; break;
          }
          if (linearBoard[off] == 2) {
            if (blackToPlay) {
              fillsEye = false; break;
            }
          }
          if (linearBoard[off] == 1) {
            if (!blackToPlay) {
              fillsEye = false; break;
            }
          }
        }
        if (fillsEye) continue;
        moves.push([x, y]);
      }
    }
    while (moves.length) {
      // Pick a move at random
      let i = Math.floor(Math.random() * moves.length);
      let [x, y] = moves[i];

      let legal = addMoveLinear(linearBoard, nextBoard, liberties, x, y, blackToPlay);
      if (!legal) {
        moves.splice(i, 1);
        continue;
      }
      let hash = zobristHashLinear(nextBoard, false);
      if (history.has(hash)) {
        moves.splice(i, 1);
        continue;
      }
      if (nextLiberties[BOARD_SIZE * x + y] == 1) {
        // it's okay to either sac a lone stone or extend from
        // a stone that was already in atari (many eye destruction
        // tactics look like that), but killing a group that wasn't under
        // atari is silly
        let alreadyDying = true;
        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          if (x + dx == -1 || x + dx == BOARD_SIZE || y + dy == -1 || y + dy == BOARD_SIZE) continue;
          let off = BOARD_SIZE * (x + dx) + (y + dy);
          if (board[off] == (blackToPlay ? 1 : 2) && liberties[off] > 1) {
            alreadyDying = false; break;
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

    /** @type [number, number, Int8Array, [number,number]|null, number, MCGSNode|null][] */
    this.children = [[this.hash ^ BITMASKS[2 * BOARD_SIZE * BOARD_SIZE], 0, board, null, 1, null]];

    let whiteEyes = (USE_AI_TWEAKS && !blackToPlay) && countWhiteEyesLinear(board);
    let territory = (USE_AI_TWEAKS && !blackToPlay) && getTerritory(board);
    for (let x = 0; x < BOARD_SIZE; ++x) {
      for (let y = 0; y < BOARD_SIZE; ++y) {
        let nb = new Int8Array(BOARD_SIZE * BOARD_SIZE);
        let legal = addMoveLinear(board, nb, liberties, x, y, blackToPlay);
        if (!legal) continue;

        let hash = zobristHashLinear(nb, !blackToPlay);
        let weight = 1;
        if (USE_AI_TWEAKS) {
          if (!blackToPlay) {
            let isatari = false;
            let iscapture = false;
            let isdefend = false;
            let isnobi = false;
            let bigatari = false;
            let white_or_offline_neighbors = 0;
            let emptycount = 0;
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
                white_or_offline_neighbors++;
                // it also won't play eye moves from a group that has
                // two eyes, but i don't really feel like checking
                let islone = true;
                for (let [ddx, ddy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                  if (x + dx + ddx == -1 || x + dx + ddx == BOARD_SIZE ||
                    y + dy + ddy == -1 || y + dy + ddy == BOARD_SIZE) continue;
                  if (board[BOARD_SIZE * (x + dx + ddx) + y + dy + ddy] == 2
                    && liberties[BOARD_SIZE * (x + dx + ddx) + y + dy + ddy] <= 5) islone = false;
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
              if (board[off] == '#') {
                white_or_offline_neighbors++;
              }
            }
            let makesEye = false;
            if (!iscapture && !isdefend && isnobi && whiteEyes < 2) {
              let nb = new Int8Array(board);
              nb[BOARD_SIZE * x + y] = 2;
              let newWhiteEyes = countWhiteEyesLinear(nb);
              if (newWhiteEyes > whiteEyes) makesEye = true;
            }

            if (iscapture) {
              weight = 1000;
            } else if (isdefend && neighborliberties + emptycount > 2) {
              weight = 800;
            } else if (makesEye && isnobi && white_or_offline_neighbors > 1 && emptycount > 0) {
              weight = 600;
            } else if (isatari) {
              if (bigatari) {
                weight = 400;
              } else {
                let nb = new Int8Array(board);
                nb[BOARD_SIZE * x + y] = 2;
                let nl = new Int8Array(BOARD_SIZE * BOARD_SIZE);
                getLibertiesLinear(nb, nl);
                if (nl[BOARD_SIZE * x + y] > 1) weight = 400;
              }
            } else if (territory[BOARD_SIZE * x + y] == 1) {
              weight = 0;
            }
          }
        }
        this.children.push([hash, 0, nb, [x, y], weight, null]);
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
    return ((BOARD_SIZE * BOARD_SIZE / 2) +
      this.N * Math.max(0.1,
        Math.sqrt((this.SS) / (this.N) - ((this.S) / (this.N)) ** 2))) / (this.N + 1);
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
    if (i % 2000 == 1999) {
      let c = root.children.reduce((x, y) => y[1] > x[1] ? y : x);
      if (c[1] >= 0.5 * PLAYOUTS) {
        break;
      }
      // stop if we're pretty sure how it's going to go
      if (root.getcPUCT() < 1) break;
    }
    let seen = new Set(seen_hashes);
    let lastPassed = lp;
    seen.add(zobristHashLinear(b, false));
    let path = [root];
    while (true) {
      let ln = path.at(-1);
      let bestScore = -Infinity;
      let nh = ln.children[0];
      let maxweight = Math.max(...ln.children.map(x=>x[4]));

      if (lastPassed) {
        ln.DP ??= ['t', 0, null, null, 1, scoreTerminalLinear(ln.board, true)];
        let score = (ln.blackToPlay ? 1 : -1) * ln.DP[5];
        // no exploration factor because we know terminal nodes have no variance
        if (score > bestScore) {
          bestScore = score;
          nn = ln.DP[5];
          nh = ln.DP;
        }
      }

      for (let c of ln.children) {
        if (seen.has(zobristHashLinear(c[2], false)) && c[3]) {
          continue;
        }
        if (lastPassed && !c[3]) continue;
        // eagerly update cached child pointer
        c[5] ??= map.get(c[0]);
        let stddev = c[5]?.getcPUCT?.() ?? BOARD_SIZE * BOARD_SIZE;
        let q = c[5] ? c[5].S / c[5].N : ln.S / ln.N;
        let score =
          ((ln.blackToPlay ? 1 : -1) *
            q +
            (EXPLORATION_PARAMETER *
              stddev
              * Math.sqrt(ln.N) / (1 + c[1])));
        if (USE_AI_TWEAKS && !ln.blackToPlay) {
          //if (c[4] > maxweight) {
          //  maxweight = c[4];
          //}
          if (c[3] && c[4] < maxweight) continue;
          //score += 10 * maxweight;
        }
        if (score > bestScore) {
          bestScore = score;
          bestCount = 1;
          nh = c;
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
      seen.add(zobristHashLinear(nh[2], false));
      nh[5] ??= map.get(nh[0]);
      if (nh[5]) {
        if (SUPPRESS_TRANSPOSITION) {
          if (nh[1] <= nh[5].N) break;
        }
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
      let s = 0, ss = 0;
      for (let c of node.children) {
        let cn = c[5] ??= map.get(c[0]);
        if (!cn) continue;
        s += c[1] * cn.S / cn.N;
        ss += c[1] * cn.SS / cn.N;
      }
      if (node.DP) {
        s += node.DP[1] * node.DP[5];
        ss += node.DP[1] * node.DP[5] * node.DP[5];
      }
      node.S = (node.U + s);
      node.SS = (node.U * node.U + ss);
    }
  }
  if (root.DP) {
    // white passed last move; DP replaces the pass node
    root.children[0] = root.DP;
  }
  let children = root.children.toSorted((x, y) => y[1] - x[1]);
  for (let c of children) {
    c[2] = c[5] ? c[5].S / c[5].N : 0;
  }
  if (ANALYSIS_MODE) {
    let refutation = children[0][5]?.children;
    if (refutation) {
      refutation.sort((x, y) => y[1] - x[1]);
      for (let r of refutation) {
        console.log(r[3] ? moveName(...r[3]) : 'pass', r[1], r[4]);
        console.log(r[5]?.S / r[5]?.N)
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

    // analyze current game state
    //let seen = ns.go.getMoveHistory().map(x => zobristHash(x, false));
    //let [q, s, moves] = await getMoves(ns.go.getBoardState(), seen, false);

    // analyze board
    let bord = ["##O.#"
,".O.O."
,"XXOOO"
,".XXOO"
,"..XXO"];
    let seen = [];
    let [q, s, moves] = await getMoves(bord, true, seen);
    ns.print('Q: ', q, ' S: ', s);
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
  for (let i = 0; i < 100; ++i) {
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
