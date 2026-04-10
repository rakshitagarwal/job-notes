// ==================== 10. MONOTONIC STACK ====================

/**
 * Pattern: Monotonic Stack
 * Used for next greater/smaller element problems
 */

// Problem 1: Daily Temperatures
// Pattern: Monotonic Stack
// Link: https://leetcode.com/problems/daily-temperatures/
const dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = []; // Store indices

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const index = stack.pop();
      result[index] = i - index;
    }
    stack.push(i);
  }

  return result;
};

// Problem 2: Next Greater Element I
// Pattern: Monotonic Stack
// Link: https://leetcode.com/problems/next-greater-element-i/
const nextGreaterElement = function (nums1, nums2) {
  const map = new Map();
  const stack = [];

  for (let i = 0; i < nums2.length; i++) {
    while (stack.length && nums2[i] > stack[stack.length - 1]) {
      const smaller = stack.pop();
      map.set(smaller, nums2[i]);
    }
    stack.push(nums2[i]);
  }

  return nums1.map((num) => map.get(num) || -1);
};

// Problem 3: Largest Rectangle in Histogram
// Pattern: Monotonic Stack
// Link: https://leetcode.com/problems/largest-rectangle-in-histogram/
const largestRectangleArea = function (heights) {
  const stack = [];
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const currentHeight = i === heights.length ? 0 : heights[i];

    while (stack.length && currentHeight < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
};

// Problem 4: Trapping Rain Water
// Pattern: Two Pointers
// Link: https://leetcode.com/problems/trapping-rain-water/
const trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
};

// Problem 5: Sum of Subarray Minimums
// Pattern: Monotonic Stack
// Link: https://leetcode.com/problems/sum-of-subarray-minimums/
const sumSubarrayMins = function (arr) {
  const MOD = 1e9 + 7;
  const n = arr.length;
  const left = new Array(n).fill(-1);
  const right = new Array(n).fill(n);
  const stack = [];

  // Find previous smaller element
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    left[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(i);
  }

  stack.length = 0;

  // Find next smaller element
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    right[i] = stack.length === 0 ? n : stack[stack.length - 1];
    stack.push(i);
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    result = (result + arr[i] * (i - left[i]) * (right[i] - i)) % MOD;
  }

  return result;
};
