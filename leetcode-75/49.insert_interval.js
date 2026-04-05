var insert = function (intervals, newInterval) {
  const res = [];
  let i = 0;
  const start = 0;
  const end = 1;

  while (i < intervals.length && intervals[i][end] < newInterval[start]) {
    res.push(intervals[i]);
    i++;
  }

  while (i < intervals.length && intervals[i][start] <= newInterval[end]) {
    newInterval[start] = Math.min(newInterval[start], intervals[i][start]);
    newInterval[end] = Math.max(newInterval[end], intervals[i][end]);
    i++;
  }

  res.push(newInterval);

  while (i < intervals.length) {
    res.push(intervals[i]);
    i++;
  }

  return res;
};

// https://leetcode.com/problems/insert-interval/
// example Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]

// example Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
