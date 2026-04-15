// ==================== 6. BINARY SEARCH ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/binary-search/overview
 * Time Complexity: O(log n) | Space Complexity: O(1)
 */

// Problem 1: Koko Eating Bananas
// Link: https://leetcode.com/problems/koko-eating-bananas/
// Time Complexity: O(log n) | Space Complexity: O(1)
var minEatingSpeed = function (apples, h) {
  // Binary search on harvest rate: find minimum rate to finish in h hours
  function timeTaken(rate) {
    let time = 0;
    // Calculate total time needed at this harvest rate
    for (let i = 0; i < apples.length; i++) {
      // Ceiling division
      time += Math.ceil(apples[i] / rate);
    }
    return time;
  }
  // Binary search bounds: minimum rate = 1, maximum rate = max apples
  let left = 1;
  let right = Math.max(...apples);

  // Binary search for minimum valid harvest rate
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (timeTaken(mid) > h) {
      // Rate too slow, need faster rate
      left = mid + 1;
    } else {
      // Rate is sufficient, try slower rate
      right = mid;
    }
  }

  return left;
};

// Problem 2: Search in Rotated Sorted Array
// Link: https://leetcode.com/problems/search-in-rotated-sorted-array/
// Time Complexity: O(log n) | Space Complexity: O(1)
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[left] <= nums[mid]) {
      // left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        // target is in the left half
        right = mid - 1;
      } else {
        // target is in the right half
        left = mid + 1;
      }
    } else {
      // right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        // target is in the right half
        left = mid + 1;
      } else {
        // target is in the left half
        right = mid - 1;
      }
    }
  }
  return -1;
}

// Problem 3: Split Array Largest Sum
// Link: https://leetcode.com/problems/split-array-largest-sum/
// Time Complexity: O(log n) | Space Complexity: O(1)
var splitArray = function (nums, k) {
  // Step 1: Define search space
  let left = Math.max(...nums); // minimum possible max sum
  let right = nums.reduce((sum, num) => sum + num, 0); // maximum possible

  // Step 2: Helper function to check feasibility
  function canSplit(maxAllowed) {
    let subarrays = 1;
    let currSum = 0;

    for (let num of nums) {
      // If adding this element exceeds limit → create new subarray
      if (currSum + num > maxAllowed) {
        subarrays++;
        currSum = num;
      } else {
        currSum += num;
      }
    }

    // Check if we can split into at most k subarrays
    return subarrays <= k;
  }

  // Step 3: Binary search on answer
  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (canSplit(mid)) {
      // Try to minimize further
      right = mid;
    } else {
      // Need larger max sum
      left = mid + 1;
    }
  }

  return left;
};

// Problem 4: Kth Smallest Element in a Sorted Matrix
// Link: https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
var kthSmallest = function (matrix, k) {
  const n = matrix.length;

  let left = matrix[0][0];
  let right = matrix[n - 1][n - 1];

  // Count elements <= mid
  function countLessEqual(mid) {
    let count = 0;
    let row = 0;
    let col = n - 1;

    while (row < n && col >= 0) {
      if (matrix[row][col] <= mid) {
        // all elements in this row till col are <= mid
        count += col + 1;
        row++;
      } else {
        col--;
      }
    }

    return count;
  }

  // Binary Search
  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (countLessEqual(mid) < k) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};

// Problem 5: Find the Smallest Divisor Given a Threshold
// Link: https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/
var smallestDivisor = function (nums, threshold) {
  let left = 1;
  let right = Math.max(...nums);

  // Helper: compute sum after division
  function computeSum(divisor) {
    let sum = 0;

    for (let num of nums) {
      // ceil division
      sum += Math.ceil(num / divisor);
    }

    return sum;
  }

  // Binary Search
  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (computeSum(mid) > threshold) {
      // divisor too small → increase it
      left = mid + 1;
    } else {
      // valid → try smaller divisor
      right = mid;
    }
  }

  return left;
};
