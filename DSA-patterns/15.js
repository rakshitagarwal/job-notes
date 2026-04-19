// ==================== 15. PREFIX SUM ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/prefix-sum/overview
 * Time Complexity: O(n) | Space Complexity: O(n)
 */

// Concept 1: Count Vowels in Substrings
/*
Write a function to efficiently count vowels within specified substrings of a given string.

The substrings will be given to you a list queries of [left, right] pairs, which correspond to the substring word[left:right + 1] in Python.

The function should return a list of integers, where each integer represents the vowel count for the corresponding query. You can assume the input string will only contain lowercase letters.

Your function should be optimized to run efficiently for a large number of queries.

Input:

word = "prefixsum"
queries = [[0, 2], [1, 4], [3, 5]]
Output: [1, 2, 1]

Explanation:
- The substring "pre" contains 1 vowel.
- The substring "fix" contains 2 vowels.
- The substring "sum" contains 1 vowel.
*/
function vowelStrings(word, queries) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const prefixSum = new Array(word.length + 1).fill(0);
  // Part 1: create the prefix sum array
  for (let i = 1; i <= word.length; i++) {
    const isVowel = vowels.has(word[i - 1]);
    prefixSum[i] = prefixSum[i - 1] + (isVowel ? 1 : 0);
  }
  // Part 2: calculate the number of vowels in each query
  const result = [];
  for (const [left, right] of queries) {
    const numVowels = prefixSum[right + 1] - prefixSum[left];
    result.push(numVowels);
  }
  return result;
}

// Problem 1: Subarray Sum Equals K
// Link: https://leetcode.com/problems/subarray-sum-equals-k/
function subarraySum(nums, k) {
  // Prefix sum + hashmap approach: count subarrays with sum = k
  let count = 0; // Count of valid subarrays
  let sum_ = 0; // Running prefix sum
  const prefix_counts = { 0: 1 }; // Map: prefix_sum -> frequency
  for (const num of nums) {
    sum_ += num; // Update running sum

    // Check if there's a prefix sum that makes current subarray sum = k
    // If sum_ - k exists, then subarray from that point to current has sum k
    if (sum_ - k in prefix_counts) {
      count += prefix_counts[sum_ - k];
    }

    // Record current prefix sum in our frequency map
    prefix_counts[sum_] = (prefix_counts[sum_] || 0) + 1;
  }
  return count;
}

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
