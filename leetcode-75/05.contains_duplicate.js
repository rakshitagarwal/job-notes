var containsDuplicate = function (nums) {
  let set = new Set(nums);
  return set.size !== nums.length;
};

// https://leetcode.com/problems/contains-duplicate/
// example Input: nums = [1,2,3,1] Output: true
// example Input: nums = [1,2,3,4] Output: false
