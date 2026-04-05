var hammingWeight = function (n) {
  let count = 0;

  while (n !== 0) {
    let isOne = 1 & n;
    if (isOne === 1) count++;

    n = n >>> 1;
  }

  return count;
};

// https://leetcode.com/problems/number-of-1-bits/
// example
// n = 11 output: 3 (1011)
