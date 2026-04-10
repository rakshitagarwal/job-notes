// ==================== 2. SLIDING WINDOW ====================

/**
 * Pattern: Sliding Window
 * Used for subarray/substring problems with expanding/shrinking window
 */

// Problem 1: Longest Substring Without Repeating Characters
// Pattern: Sliding Window with fixed size
// Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/
const lengthOfLongestSubstring = function (s) {
  const charMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character exists and is within current window
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

// Problem 2: Minimum Window Substring
// Pattern: Sliding Window
// Link: https://leetcode.com/problems/minimum-window-substring/
const minWindow = function (s, t) {
  if (s.length < t.length) return "";

  const needMap = new Map();
  const windowMap = new Map();

  // Build frequency map for t
  for (const char of t) {
    needMap.set(char, (needMap.get(char) || 0) + 1);
  }

  let left = 0;
  let have = 0;
  const need = needMap.size;
  let result = [-Infinity, Infinity]; // [left, right]

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    if (needMap.has(char) && windowMap.get(char) === needMap.get(char)) {
      have++;
    }

    // Shrink window while condition is satisfied
    while (have === need) {
      // Update result
      if (right - left < result[1] - result[0]) {
        result = [left, right];
      }

      // Remove left character
      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);

      if (
        needMap.has(leftChar) &&
        windowMap.get(leftChar) < needMap.get(leftChar)
      ) {
        have--;
      }
      left++;
    }
  }

  return result[1] === Infinity ? "" : s.slice(result[0], result[1] + 1);
};

// Problem 3: Permutation in String
// Pattern: Sliding Window
// Link: https://leetcode.com/problems/permutation-in-string/
const checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;

  const s1Map = new Array(26).fill(0);
  const s2Map = new Array(26).fill(0);

  // Build frequency maps
  for (let i = 0; i < s1.length; i++) {
    s1Map[s1.charCodeAt(i) - 97]++;
    s2Map[s2.charCodeAt(i) - 97]++;
  }

  // Check initial window
  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (s1Map[i] === s2Map[i]) matches++;
  }

  // Slide window
  for (let i = s1.length; i < s2.length; i++) {
    if (matches === 26) return true;

    // Add new character
    const newChar = s2.charCodeAt(i) - 97;
    s2Map[newChar]++;
    if (s2Map[newChar] === s1Map[newChar]) {
      matches++;
    } else if (s2Map[newChar] === s1Map[newChar] + 1) {
      matches--;
    }

    // Remove old character
    const oldChar = s2.charCodeAt(i - s1.length) - 97;
    s2Map[oldChar]--;
    if (s2Map[oldChar] === s1Map[oldChar]) {
      matches++;
    } else if (s2Map[oldChar] === s1Map[oldChar] - 1) {
      matches--;
    }
  }

  return matches === 26;
};

// Problem 4: Max Consecutive Ones III
// Pattern: Sliding Window
// Link: https://leetcode.com/problems/max-consecutive-ones-iii/
const longestOnes = function (nums, k) {
  let left = 0;
  let maxLength = 0;
  let zerosCount = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zerosCount++;

    while (zerosCount > k) {
      if (nums[left] === 0) zerosCount--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

// Problem 5: Find All Anagrams in a String
// Pattern: Sliding Window
// Link: https://leetcode.com/problems/find-all-anagrams-in-a-string/
const findAnagrams = function (s, p) {
  const result = [];
  if (s.length < p.length) return result;

  const pMap = new Array(26).fill(0);
  const sMap = new Array(26).fill(0);

  for (let i = 0; i < p.length; i++) {
    pMap[p.charCodeAt(i) - 97]++;
    sMap[s.charCodeAt(i) - 97]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (pMap[i] === sMap[i]) matches++;
  }

  for (let i = p.length; i < s.length; i++) {
    if (matches === 26) result.push(i - p.length);

    const newChar = s.charCodeAt(i) - 97;
    sMap[newChar]++;
    if (sMap[newChar] === pMap[newChar]) {
      matches++;
    } else if (sMap[newChar] === pMap[newChar] + 1) {
      matches--;
    }

    const oldChar = s.charCodeAt(i - p.length) - 97;
    sMap[oldChar]--;
    if (sMap[oldChar] === pMap[oldChar]) {
      matches++;
    } else if (sMap[oldChar] === pMap[oldChar] - 1) {
      matches--;
    }
  }

  if (matches === 26) result.push(s.length - p.length);
  return result;
};
