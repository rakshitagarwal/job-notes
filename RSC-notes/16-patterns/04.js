// ==================== 4. BINARY SEARCH ====================

/**
 * Pattern: Binary Search
 * Used on sorted data or search space, O(log n) complexity
 */

// Problem 1: Binary Search
// Pattern: Binary Search
// Link: https://leetcode.com/problems/binary-search/
const search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

// Problem 2: Search in Rotated Sorted Array
// Pattern: Binary Search with rotation
// Link: https://leetcode.com/problems/search-in-rotated-sorted-array/
const searchRotated = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
};

// Problem 3: Find Peak Element
// Pattern: Binary Search with rotation
// Link: https://leetcode.com/problems/find-peak-element/
const findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

// Problem 4: Koko Eating Bananas
// Pattern: Binary Search with rotation
// Link: https://leetcode.com/problems/koko-eating-bananas/
const minEatingSpeed = function (piles, h) {
  const canEat = (speed) => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  };

  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canEat(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

// Problem 5: Search a 2D Matrix
// Pattern: Binary Search with rotation
// Link: https://leetcode.com/problems/search-a-2d-matrix/
const searchMatrix = function (matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = matrix[Math.floor(mid / cols)][mid % cols];

    if (midValue === target) {
      return true;
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};
