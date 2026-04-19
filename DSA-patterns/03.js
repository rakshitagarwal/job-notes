// ==================== 3. INVERSALS ====================

/**
 * Pattern: Intervals
 * Notes: https://www.hellointerview.com/learn/code/intervals/overview
 * Used for cycle detection and finding middle in linked lists
 */

// Problem 1: Can Attend Meetings
// Link: https://leetcode.com/problems/meeting-rooms/description/
// Time: O(nlogn) | Space: O(1)
function canAttendMeetings(intervals) {
  if (intervals.length === 0) {
    return true;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
}

// Problem 2: Insert Interval
// Link: https://leetcode.com/problems/insert-interval/description/
// Time: O(nlogn) | Space: O(n)
function insertIntervals(intervals, newInterval) {
  const merged = [];
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i][1] < newInterval[0]) {
    merged.push(intervals[i]);
    i++;
  }
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }
  merged.push(newInterval);
  for (let j = i; j < n; j++) {
    merged.push(intervals[j]);
  }
  return merged;
}

// Problem 3: Non-overlapping Intervals
// Link: https://leetcode.com/problems/non-overlapping-intervals/description/
// Time: O(nlogn) | Space: O(n)
function nonOverlappingIntervals(intervals) {
  if (intervals.length === 0) {
    return 0;
  }
  intervals.sort((a, b) => a[1] - b[1]);
  let end = intervals[0][1];
  let count = 1;
  for (let i = 1; i < intervals.length; i++) {
    // Non-overlapping interval found
    if (intervals[i][0] >= end) {
      end = intervals[i][1];
      count++;
    }
  }
  return intervals.length - count;
}

// Pattern 4: Merge Intervals
// Link: https://leetcode.com/problems/merge-intervals/description/
// Time: O(nlogn) | Space: O(1)
function mergeIntervals(intervals) {
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (const interval of sortedIntervals) {
    if (merged.length === 0 || interval[0] > merged[merged.length - 1][1]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(
        interval[1],
        merged[merged.length - 1][1],
      );
    }
  }
  return merged;
}

// Pattern 5: Employee Free Time
// Link: https://leetcode.com/problems/employee-free-time/description/
// Time: O(nlogn) | Space: O(1)
function employeeFreeTime(schedule) {
  const flattened = schedule.flat();
  const intervals = flattened.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const interval of intervals) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1],
      );
    }
  }

  const free_times = [];
  for (let i = 1; i < merged.length; i++) {
    const start = merged[i - 1][1];
    const end = merged[i][0];
    free_times.push([start, end]);
  }
  return free_times;
}
