// ==================== 1. TWO POINTERS ====================

/**
 * Pattern: Two Pointers
 * Used for sorted arrays, pair finding, and palindrome checking
 */

// Problem 1: Two Sum II - Input Array Is Sorted
// Pattern: Two pointers moving from both ends
// Link: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
const twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
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

// Problem 2: 3Sum
// Pattern: Fix one element, use two pointers for the other two
// Link: https://leetcode.com/problems/3sum/
const threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Skip duplicates
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
};

// Problem 3: Container With Most Water
// Pattern: Two pointers, move the pointer with smaller height
// Link: https://leetcode.com/problems/container-with-most-water/
const maxArea = function (height) {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * minHeight);

    // Move the pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
};

// Problem 4: Remove Duplicates from Sorted Array
// Pattern: Two pointers - one for reading, one for writing
// Link: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
const removeDuplicates = function (nums) {
  if (nums.length === 0) return 0;

  let writePointer = 1;

  for (let readPointer = 1; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== nums[readPointer - 1]) {
      nums[writePointer] = nums[readPointer];
      writePointer++;
    }
  }

  return writePointer;
};

// Problem 5: Valid Palindrome
// Pattern: Two pointers from both ends, skip non-alphanumeric
// Link: https://leetcode.com/problems/valid-palindrome/
const isPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }
  return true;
};

const isAlphanumeric = function (char) {
  return /[a-zA-Z0-9]/.test(char);
};
