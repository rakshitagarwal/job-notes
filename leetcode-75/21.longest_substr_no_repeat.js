var lengthOfLongestSubstring = function (s) {
  let longestStr = 0;
  let set = new Set();

  let left = 0;
  let right = 0;

  while (right < s.length) {
    let letter = s[right];

    if (!set.has(letter)) {
      set.add(letter);
      longestStr = Math.max(longestStr, set.size);
      right++;
    } else {
      set.delete(s[left]);
      left++;
    }
  }

  return longestStr;
};

// https://leetcode.com/problems/longest-substring-without-repeating-characters/

// example Input: s = "abcabcbb" Output: 3
// example Input: s = "bbbbb" Output: 1
// example Input: s = "pwwkew" Output: 3
