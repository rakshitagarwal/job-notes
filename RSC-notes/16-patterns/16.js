// ==================== 16. PREFIX SUM ====================

/**
 * Pattern: Prefix Sum
 * Used for range queries and cumulative sums
 */

// Problem 1: Subarray Sum Equals K
// Pattern: Prefix Sum
// Link: https://leetcode.com/problems/subarray-sum-equals-k/
const subarraySum = function (nums, k) {
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1);

  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;

    if (prefixSumCount.has(sum - k)) {
      count += prefixSumCount.get(sum - k);
    }

    prefixSumCount.set(sum, (prefixSumCount.get(sum) || 0) + 1);
  }

  return count;
};

// Problem 2: Range Sum Query - Immutable
// Pattern: Prefix Sum
// Link: https://leetcode.com/problems/range-sum-query-immutable/
class NumArray {
  constructor(nums) {
    this.prefixSum = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
    }
  }

  sumRange(left, right) {
    return this.prefixSum[right + 1] - this.prefixSum[left];
  }
}

// Problem 3: Continuous Subarray Sum
// Pattern: Prefix Sum
// Link: https://leetcode.com/problems/continuous-subarray-sum/
const checkSubarraySum = function (nums, k) {
  const remainderMap = new Map();
  remainderMap.set(0, -1);

  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (k !== 0) {
      sum %= k;
    }

    if (remainderMap.has(sum)) {
      if (i - remainderMap.get(sum) >= 2) {
        return true;
      }
    } else {
      remainderMap.set(sum, i);
    }
  }

  return false;
};

// Problem 4: Product of Array Except Self
// Pattern: Prefix Sum
// Link: https://leetcode.com/problems/product-of-array-except-self/
const productExceptSelf = function (nums) {
  const result = new Array(nums.length).fill(1);

  // Calculate prefix products
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Calculate suffix products and multiply
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
};

// Problem 5: Find Pivot Index
// Pattern: Prefix Sum
// Link: https://leetcode.com/problems/find-pivot-index/
const pivotIndex = function (nums) {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (leftSum === totalSum - leftSum - nums[i]) {
      return i;
    }
    leftSum += nums[i];
  }

  return -1;
};
