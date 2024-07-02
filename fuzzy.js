function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  let matrix = Array(len1 + 1);
  for (let i = 0; i <= len1; i++) {
    matrix[i] = Array(len2 + 1);
  }

  for (let i = 0; i <= len1; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[len1][len2];
}

// Wraps an object (like ns) with a fuzzy string matcher
function FuzzyWrapper(obj) {
  const handler = {
    get(target, prop, receiver) {
      // save a little work if it was typed correctly
      if (Object.hasOwn(prop)) {
        return target[prop];
      }
      let props = Object.keys(target), bm, bd = Infinity, bmc = 0;
      for (let eprop of props) {
        let d = levenshteinDistance(prop, eprop);
        if (d < bd) {
          bm = eprop;
          bd = d;
          bmc = 1;
        } else if (d == bd) {
          bmc++;
        }
      }
      if (bmc > 1) {
        throw `ambiguous property ${prop}`;
      }
      let val = target[bm];
      if (typeof val == 'object') {
        return FuzzyWrapper(val);
      }
      return val;
    },
  };
  return new Proxy(obj, handler);
}

/** @param {NS} ns */
export async function main(ns) {
  let bs = FuzzyWrapper(ns);
  bs.fail();
  bs.pring(bs.enms.CiN.A);
}
