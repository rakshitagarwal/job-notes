var twoSum = function (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const compliment = target - nums[i];

    if (map.has(compliment)) {
      return [i, map.get(compliment)];
    } else {
      map.set(nums[i], i);
    }
  }
};

// https://leetcode.com/problems/two-sum/
// example Input: nums = [2,7,11,15], target = 9 Output: [0,1]
// example Input: nums = [3,2,4], target = 6 Output: [1,2]
// example Input: nums = [3,3], target = 6 Output: [0,1]
