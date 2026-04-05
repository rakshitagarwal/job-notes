var maxProduct = function (nums) {
  let prevMax = nums[0];
  let prevMin = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const curMax = Math.max(nums[i], nums[i] * prevMax, nums[i] * prevMin);
    const curMin = Math.min(nums[i], nums[i] * prevMax, nums[i] * prevMin);

    prevMin = curMin;
    prevMax = curMax;

    result = Math.max(result, curMax);
  }

  return result;
};

// https://leetcode.com/problems/maximum-product-subarray/
// example
// nums = [2, 3, -2, 4] output: 6
// nums = [-2, 0, -1] output: 0
