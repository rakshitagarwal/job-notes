// ==================== 12. DYNAMIC PROGRAMMING ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/dynamic-programming/fundamentals
 * Notes: https://www.hellointerview.com/learn/code/dynamic-programming/solving-a-question-with-dp
 * Time Complexity: O(n) | Space Complexity: O(n)
 */

// Problem 1: Counting Bits
// Link: https://leetcode.com/problems/counting-bits/
// Time Complexity: O(n) | Space Complexity: O(n)
var countBits = function (n) {
  let dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[Math.floor(i / 2)] + (i % 2);
  }
  return dp;
};

// Problem 2: Decode Ways
// Link: https://leetcode.com/problems/decode-ways/
// Time Complexity: O(n) | Space Complexity: O(n)
function numDecodings(s) {
  if (!s || s[0] === "0") {
    return 0;
  }
  let n = s.length;
  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    let digit = parseInt(s[i - 1]);
    if (digit !== 0) {
      dp[i] += dp[i - 1];
    }

    digit = parseInt(s.substring(i - 2, i));
    if (digit >= 10 && digit <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[n];
}

// Problem 3: Unique Paths
// Link: https://leetcode.com/problems/unique-paths/
// Time Complexity: O(m*n) | Space Complexity: O(m*n)
function uniquePaths(m, n) {
  // Initialize a 2D array with dimensions m x n
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0));

  // base case: there is only one way to reach any cell in the first row (moving only right)
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }

  // Set base case: there is only one way to reach any cell in the first column (moving only down)
  for (let j = 0; j < m; j++) {
    dp[j][0] = 1;
  }

  // Fill the rest of the dp array
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

// Problem 4: Maximal Square
// Link: https://leetcode.com/problems/maximal-square/
// Time Complexity: O(m*n) | Space Complexity: O(m*n)
function maximalSquare(matrix) {
  if (!matrix || matrix.length === 0) {
    return 0;
  }
  let r = matrix.length;
  let c = matrix[0].length;
  let dp = Array.from({ length: r + 1 }, () => Array(c + 1).fill(0));
  let maxSide = 0;
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= c; j++) {
      if (matrix[i - 1][j - 1] === 1) {
        let top = dp[i - 1][j];
        let left = dp[i][j - 1];
        let diag = dp[i - 1][j - 1];
        dp[i][j] = Math.min(top, left, diag) + 1;
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }
  return maxSide * maxSide;
}

// Problem 5: Longest Increasing Subsequence
// Link: https://leetcode.com/problems/longest-increasing-subsequence/
// Time Complexity: O(n^2) | Space Complexity: O(n)
var lengthOfLIS = function (nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }
  let n = nums.length;
  let dp = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
};

// Problem 6: Word Break
// Link: https://leetcode.com/problems/word-break/
// Time Complexity: O(n^2) | Space Complexity: O(n)
var wordBreak = function (s, wordDict) {
  let wordSet = new Set(wordDict);
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // Empty string is a valid break
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      let sub = s.substring(j, i);
      if (dp[j] && wordSet.has(sub)) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
};

// Problem 7: Maximum Profit in Job Scheduling
// Link: https://leetcode.com/problems/maximum-profit-in-job-scheduling/
function jobScheduling(starts, ends, profits) {
  const jobs = starts
    .map((start, i) => [start, ends[i], profits[i]])
    .sort((a, b) => a[1] - b[1]);
  const dp = new Array(jobs.length + 1).fill(0);
  for (let i = 1; i <= jobs.length; i++) {
    const [start, end, profit] = jobs[i - 1];
    // find number of jobs to finish before start of current job
    const numJobs = bisectRight(
      jobs.map((job) => job[1]),
      start,
    );

    dp[i] = Math.max(dp[i - 1], dp[numJobs] + profit);
  }

  return dp[dp.length - 1];
}

function bisectRight(arr, target) {
  let left = 0,
    right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) left = mid + 1;
    else right = mid;
  }
  return left;
}
