// ==================== 2. SLIDING WINDOW ====================

/**
 * Pattern: Sliding Window
 * Notes: https://www.hellointerview.com/learn/code/sliding-window/fixed-length
 * Notes: https://www.hellointerview.com/learn/code/sliding-window/variable-length
 * Used for subarray/substring problems with expanding/shrinking window
 */

// Problem 1: Maximum Sum of Subarrays of Size K
// Link: https://leetcode.com/problems/maximum-sum-of-a-subarray-of-size-k/
// Time Complexity: O(N) | Space Complexity: O(1)
function maxSubarraySum(nums, k) {
  let maxSum = -Infinity;
  let windowSum = 0;
  let start = 0;
  for (let end = 0; end < nums.length; end++) {
    windowSum += nums[end];
    if (end - start + 1 === k) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= nums[start];
      start++;
    }
  }
  return maxSum;
}

// Problem 2: Maximum Points You Can Obtain from Cards
// Link: https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
// Time Complexity: O(N) | Space Complexity: O(1)
function maxScore(cards, k) {
  const total = cards.reduce((sum, card) => sum + card, 0);
  if (k === cards.length) {
    return total;
  }
  let state = 0;
  let maxPoints = 0;
  let start = 0;
  for (let end = 0; end < cards.length; end++) {
    state += cards[end];
    if (end - start + 1 === cards.length - k) {
      maxPoints = Math.max(total - state, maxPoints);
      state -= cards[start];
      start++;
    }
  }
  return maxPoints;
}

// Problem 3: Maximum Sum of Distinct Subarrays With Length K
// Link: https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/
// Time Complexity: O(N) | Space Complexity: O(1)
var maximumSubarraySum = function (nums, k) {
  let maxSum = -Infinity;
  let start = 0;
  let state = {};
  let currSum = 0;

  for (let end = 0; end < nums.length; end++) {
    currSum += nums[end];
    state[nums[end]] = (state[nums[end]] || 0) + 1;

    if (end - start + 1 === k) {
      if (Object.keys(state).length === k) {
        maxSum = Math.max(maxSum, currSum);
      }

      currSum -= nums[start];
      state[nums[start]]--;
      if (state[nums[start]] === 0) {
        delete state[nums[start]];
      }
      start++;
    }
  }
  return maxSum === -Infinity ? 0 : maxSum;
};

// variable length sliding window pattern
// Problem 4: Fruit Into Baskets
// Link: https://leetcode.com/problems/fruit-into-baskets/
// Time Complexity: O(N) | Space Complexity: O(1)
var totalFruit = function (fruits) {
  let start = 0;
  let basket = {};
  let maxFruit = 0;
  for (let end = 0; end < fruits.length; end++) {
    basket[fruits[end]] = (basket[fruits[end]] || 0) + 1;
    while (Object.keys(basket).length > 2) {
      basket[fruits[start]]--;
      if (basket[fruits[start]] === 0) {
        delete basket[fruits[start]];
      }
      start++;
    }
    maxFruit = Math.max(maxFruit, end - start + 1);
  }
  return maxFruit;
};

// Problem 5: Longest Substring Without Repeating Characters
// Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/
// Time Complexity: O(N) | Space Complexity: O(1)
var lengthOfLongestSubstring = function (s) {
  let state = {};
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    state[s[end]] = (state[s[end]] || 0) + 1;
    while (state[s[end]] > 1) {
      state[s[start]]--;
      start++;
    }
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
};

// Problem 6: Longest Repeating Character Replacement
// Link: https://leetcode.com/problems/longest-repeating-character-replacement/
// Time Complexity: O(N) | Space Complexity: O(1)
var characterReplacement = function (s, k) {
  let charCount = {};
  let maxFreq = 0;
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    charCount[s[end]] = (charCount[s[end]] || 0) + 1;
    maxFreq = Math.max(maxFreq, charCount[s[end]]);

    if (end - start + 1 - maxFreq > k) {
      charCount[s[start]]--;
      start++;
    }
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
};
