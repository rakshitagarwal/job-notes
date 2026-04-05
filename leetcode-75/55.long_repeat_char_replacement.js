var characterReplacement = function (s, k) {
  let map = {};
  let topFrequency = 0;
  let longest = 0;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    let rightChar = s[right];
    map[rightChar] = map[rightChar] + 1 || 1;
    topFrequency = Math.max(topFrequency, map[rightChar]);

    while (right - left + 1 - topFrequency > k) {
      let leftChar = s[left];
      map[leftChar]--;
      left++;
    }
    longest = Math.max(longest, right - left + 1);
    right++;
  }
  return longest;
};

// https://leetcode.com/problems/longest-repeating-character-replacement/
// example 1:
// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
// The substring "BBBB" has the longest repeating letters, which is 4.

// example 2:
// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.
