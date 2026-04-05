var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxima = 0;

  while (left < right) {
    let width = right - left;
    let maxArea = Math.min(height[left], height[right]) * width;

    maxima = Math.max(maxima, maxArea);

    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxima;
};

// https://leetcode.com/problems/container-with-most-water/
// example Input: height = [1,8,6,2,5,4,8,3,7] Output: 49
