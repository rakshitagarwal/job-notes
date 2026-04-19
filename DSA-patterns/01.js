// ==================== 1. TWO POINTERS ====================

/**
 * Pattern: Two Pointers
 * Notes: https://www.hellointerview.com/learn/code/two-pointers/overview
 * Used for sorted arrays, pair finding, and palindrome checking
 */

// Container with most water
// Link: https://leetcode.com/problems/container-with-most-water/
// Time Complexity: O(n) | Space Complexity: O(1)
function maxArea(heights) {
  let left = 0,
    right = heights.length - 1;
  let currentMax = 0;

  while (left < right) {
    let width = right - left;
    let height = Math.min(heights[left], heights[right]);
    let currentArea = width * height;

    currentMax = Math.max(currentMax, currentArea);

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return currentMax;
}

// Two Sum (sorted array)
// Link: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted
// Time Complexity: O(n) | Space Complexity: O(1)
var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1]; // 1-indexed
    } else if (sum < target) {
      left++; // Need larger sum
    } else {
      right--; // Need smaller sum
    }
  }

  return [];
};

// 3sum
// Link: https://leetcode.com/problems/3sum/
// Time Complexity: O(n^2) | Space Complexity: O(1)
var threeSum = function (nums) {
  // Sort array to enable two-pointer technique and handle duplicates
  nums.sort((a, b) => a - b);
  const result = [];

  // Fix the first element and use two pointers for the remaining two
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for the first element to avoid duplicate triplets
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    // Initialize two pointers for the remaining subarray
    let left = i + 1;
    let right = nums.length - 1;

    // Use two-pointer technique to find pairs that sum to -nums[i]
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total < 0) {
        // Sum too small, move left pointer right to increase sum
        left++;
      } else if (total > 0) {
        // Sum too large, move right pointer left to decrease sum
        right--;
      } else {
        // Found a valid triplet
        result.push([nums[i], nums[left], nums[right]]);
        // Skip all duplicate values to avoid duplicate triplets
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
        // Move both pointers to continue searching
        left++;
        right--;
      }
    }
  }
  return result;
};

// valid triangle number
// Link: https://leetcode.com/problems/valid-triangle-number/
// Time Complexity: O(n^2) | Space Complexity: O(1)
function triangleNumber(nums) {
  nums.sort((a, b) => a - b);

  let count = 0;
  for (let i = nums.length - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;
    while (left < right) {
      if (nums[left] + nums[right] > nums[i]) {
        count += right - left;
        right--;
      } else {
        left++;
      }
    }
  }

  return count;
}

// move zeroes
// Link: https://leetcode.com/problems/move-zeroes/
// Time Complexity: O(n) | Space Complexity: O(1)
function moveZeroes(nums) {
  let nonZero = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[i], nums[nonZero]] = [nums[nonZero], nums[i]];
      nonZero++;
    }
  }
}

// sort colors
// Link: https://leetcode.com/problems/sort-colors/
// Time Complexity: O(n) | Space Complexity: O(1)

function sortColors(nums) {
  let left = 0,
    right = nums.length - 1;
  let i = 0;
  while (i <= right) {
    if (nums[i] === 0) {
      [nums[i], nums[left]] = [nums[left], nums[i]];
      left++;
      i++;
    } else if (nums[i] === 2) {
      [nums[i], nums[right]] = [nums[right], nums[i]];
      right--;
    } else {
      i++;
    }
  }
  return nums;
}

// trapping rain water
// Link: https://leetcode.com/problems/trapping-rain-water/
// Time Complexity: O(n) | Space Complexity: O(1)
function trappingWater(heights) {
  if (!heights.length) {
    return 0;
  }
  let left = 0,
    right = heights.length - 1;
  let leftMax = heights[left],
    rightMax = heights[right];
  let count = 0;

  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      if (heights[left] >= leftMax) {
        leftMax = heights[left];
      } else {
        count += leftMax - heights[left];
      }
    } else {
      right--;
      if (heights[right] >= rightMax) {
        rightMax = heights[right];
      } else {
        count += rightMax - heights[right];
      }
    }
  }

  return count;
}
