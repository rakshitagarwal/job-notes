var canAttachMeetings = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]); // sort by start time
  const start = 0;
  const end = 1;
  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][end] > intervals[i + 1][start]) {
      return false;
    }
  }

  return true;
};

// https://leetcode.com/problems/meeting-rooms/
// example Input: intervals = [[0,30],[5,10],[15,20]] Output: false
// example Input: intervals = [[7,10],[2,4]] Output: true
// example Input: intervals = [[6,7],[2,4],[8,12]] Output: false
