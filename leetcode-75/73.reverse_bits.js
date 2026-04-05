var reverseBits = function (n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    let lastBit = n & 1;
    let revBit = lastBit << (31 - i);
    result = result | revBit;
    n = n >>> 1;
  }

  return result >>> 0;
};

// https://leetcode.com/problems/reverse-bits
// example
// n = 43261596 (00000010100101000001111010011100) output: 964176192 (00111001011110000010100101000000)
// n = 2147483644 (11111111111111111111111111111101) output: 3221225471 (10111111111111111111111111111111)
