// ==================== 13. BIT MANIPULATION ====================

/**
 * Pattern: Bit Manipulation
 * Used for XOR and bit-level optimizations
 */

// Problem 1: Single Number
// Pattern: XOR
// Link: https://leetcode.com/problems/single-number/
const singleNumber = function (nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
};

// Problem 2: Counting Bits
// Pattern: Dynamic Programming
// Link: https://leetcode.com/problems/counting-bits/
const countBits = function (n) {
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }

  return dp;
};

// Problem 3: Missing Number
// Pattern: XOR
// Link: https://leetcode.com/problems/missing-number/
const missingNumber = function (nums) {
  let xor = nums.length;

  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }

  return xor;
};

// Problem 4: Sum of Two Integers
// Pattern: Bit Manipulation
// Link: https://leetcode.com/problems/sum-of-two-integers/
const getSum = function (a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
};

// Problem 5: Subsets (Bit Manipulation version)
// Pattern: Bit Manipulation
// Link: https://leetcode.com/problems/subsets/
const subsetsBit = function (nums) {
  const result = [];
  const total = 1 << nums.length;

  for (let i = 0; i < total; i++) {
    const subset = [];
    for (let j = 0; j < nums.length; j++) {
      if (i & (1 << j)) {
        subset.push(nums[j]);
      }
    }
    result.push(subset);
  }

  return result;
};
