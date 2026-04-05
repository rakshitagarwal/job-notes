// nums = [1, 2, 3, 4]
var productExceptSelf = function (nums) {
  let forwardArr = [];
  let start1 = 1;

  for (let i = 0; i < nums.length; i++) {
    forwardArr.push(start1);
    start1 = start1 * nums[i];
  }

  let res = [];
  let start2 = 1;
  // forwardArr = [1, 1, 2, 6]
  for (let i = nums.length - 1; i >= 0; i--) {
    res.unshift(start2 * forwardArr[i]);
    start2 = start2 * nums[i];
  }
  // res = [24, 12, 8, 6]
  return res;
};
// O(n + m)

// https://leetcode.com/problems/product-of-array-except-self/
// example Input: nums = [1,2,3,4] Output: [24,12,8,6]
// example Input: nums = [-1,1,0,-3,3] Output: [0,0,9,0,0]
