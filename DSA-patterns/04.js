// ==================== 4. STACK ====================

/**
 * Pattern: Stack
 * Notes: https://www.hellointerview.com/learn/code/stack/overview
 * Used for LIFO (Last In First Out) problems
 * Used for undo/redo
 */

// Problem 1: Valid Parentheses
// Link: https://leetcode.com/problems/valid-parentheses/
// Time Complexity: O(n) | Space Complexity: O(n)
function isValid(s) {
  const stack = [];
  const mapping = { ")": "(", "}": "{", "]": "[" };
  for (const char of s) {
    if (char in mapping) {
      if (stack.length === 0 || stack[stack.length - 1] !== mapping[char]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

// Problem 2: Decode String
// Link: https://leetcode.com/problems/decode-string/description/
// Time Complexity: O(n) | Space Complexity: O(n)
function decodeString(s) {
  let stack = [];
  let currString = "";
  let currentNumber = 0;
  for (let char of s) {
    if (char === "[") {
      stack.push(currString);
      stack.push(currentNumber);
      currString = "";
      currentNumber = 0;
    } else if (char === "]") {
      let num = stack.pop();
      let prevString = stack.pop();
      currString = prevString + currString.repeat(num);
    } else if (/\d/.test(char)) {
      currentNumber = currentNumber * 10 + parseInt(char);
    } else {
      currString += char;
    }
  }
  return currString;
}

// Problem 3: Longest Valid Parentheses
// Link: https://leetcode.com/problems/longest-valid-parentheses/description/
// Time Complexity: O(n) | Space Complexity: O(n)
function longestValidParentheses(s) {
  let maxLen = 0;
  let stack = [-1];

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (char === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}

// Pattern: Monotonic Stack
// Notes: https://www.hellointerview.com/learn/code/stack/monotonic-stack

// Problem 4: Daily Temperatures
// Link: https://leetcode.com/problems/daily-temperatures/
function dailyTemperatures(temps) {
  const n = temps.length;
  const result = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}

// Problem 5: Largest Rectangle in Histogram
// Link: https://leetcode.com/problems/largest-rectangle-in-histogram/description/
function largestRectangleArea(heights) {
  let stack = [];
  let maxArea = 0;
  let i = 0;
  while (i < heights.length) {
    if (stack.length === 0 || heights[i] >= heights[stack[stack.length - 1]]) {
      stack.push(i);
      i++;
    } else {
      let top = stack.pop();
      let right = i - 1;
      let left = stack.length === 0 ? -1 : stack[stack.length - 1];
      let area = heights[top] * (right - left);
      maxArea = Math.max(maxArea, area);
    }
  }

  while (stack.length > 0) {
    let top = stack.pop();
    let width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
    let area = heights[top] * width;
    maxArea = Math.max(maxArea, area);
  }
  return maxArea;
}
