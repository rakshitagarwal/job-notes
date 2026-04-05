var missingNumber = function (nums) {
  let xor = nums.length;

  for (let i = 0; i < nums.length; i++) {
    xor = xor ^ i ^ nums[i];
  }

  return xor;
};

// https://leetcode.com/problems/missing-number/
// example 1:
// Input: nums = [3,0,1]
// Output: 2
// Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing NO.
