// greedy approach
var canJump = function (nums) {
  let target = nums.length - 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (i + nums[i] >= target) {
      target = i;
    }
  }

  return target === 0;
};

// https://leetcode.com/problems/jump-game/
// example Input: nums = [2,3,1,1,4] Output: true
// example Input: nums = [3,2,1,0,4] Output: false
