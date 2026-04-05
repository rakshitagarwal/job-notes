// my solution
var topKFrequent = function (nums, k) {
  let map = {};
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      map[nums[i]] += 1;
    } else {
      map[nums[i]] = 1;
    }
  }

  let freq = Object.keys(map).sort((a, b) => map[b] - map[a]);
  for (let i = 0; i < k; i++) {
    result.push(parseInt(freq[i]));
  }
  return result;
};

// video solution not working anymore
var topKFrequent = function (nums, k) {
  let map = {};
  let bucket = [];
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      map[nums[i]] += 1;
    } else {
      map[nums[i]] = 1;
    }
  }

  for (let [num, freq] of Object.entries(map)) {
    if (!bucket[freq]) {
      bucket[freq] = new Set().add(num);
    } else {
      bucket[freq] = bucket[freq].add(num);
    }
  }

  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length === k) return result;
  }

  return result;
};

// https://leetcode.com/problems/top-k-frequent-elements/
// example
// nums = [1, 1, 1, 2, 2, 3], k = 2
// output = [1, 2]
