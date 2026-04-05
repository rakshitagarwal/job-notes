var myAtoi = function (s) {
  let index = 0;
  let isNeg = false;
  let res = 0;

  for (let i = index; i < s.length; i++) {
    if (s[i] === " ") {
      index++;
    } else {
      break;
    }
  }

  if (s[index] === "-" || s[index] === "+") {
    isNeg = s[index] === "-";
    index++;
  }

  for (let i = index; i < s.length; i++) {
    let num = s.charCodeAt(i) - 48;
    if (num < 0 || num > 9) break;

    res *= 10;
    res += num;
  }

  if (isNeg) {
    res = -res;
  }

  let min = -(2 ** 31);
  let max = 2 ** 31 - 1;

  let minima = Math.min(max, res);
  return Math.max(minima, min);
};

// https://leetcode.com/problems/string-to-integer-atoi/
// example 1: "42" => 42
// example 2: " -042" => -42
// example 3: "1337c0d3" => 1337
