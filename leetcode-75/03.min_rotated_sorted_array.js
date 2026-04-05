var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[right] < nums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
};

// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
// example Input: nums = [3,4,5,1,2] Output: 1
// example Input: nums = [4,5,6,7,0,1,2] Output: 0
// example Input: nums = [11,13,15,17] Output: 11
