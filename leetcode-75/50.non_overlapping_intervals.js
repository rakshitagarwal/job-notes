var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let prev = 0;

  for (let i = 1; i < intervals.length; i++) {
    let current = intervals[i];
    if (current[0] < intervals[prev][1]) {
      count++;
    } else {
      prev = i;
    }
  }

  return count;
};

// https://leetcode.com/problems/non-overlapping-intervals/
// example Input: intervals = [[1,2],[2,3],[3,4],[1,3]] Output: 1
// example Input: intervals = [[1,2],[1,2],[1,2]] Output: 2
// example Input: intervals = [[1,2],[2,3]] Output: 0
