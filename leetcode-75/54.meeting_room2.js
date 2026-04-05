var minMeetingRooms = function (intervals) {
  if (!intervals || intervals.length < 1) return 0;
  const starts = intervals.map((interval) => interval[0]).sort((a, b) => a - b);
  const ends = intervals.map((interval) => interval[1]).sort((a, b) => a - b);

  let rooms = 0;
  let end = 0;

  for (let i = 0; i < intervals.length; i++) {
    if (starts[i] < ends[end]) {
      rooms++;
    } else {
      end++;
    }
  }

  return rooms;
};

// https://leetcode.com/problems/meeting-rooms-ii/
// example Input: intervals = [[0,30],[5,10],[15,20]] Output: 2
