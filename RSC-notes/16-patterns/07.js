// ==================== 7. DYNAMIC PROGRAMMING ====================

/**
 * Pattern: Dynamic Programming
 * Used when overlapping subproblems exist
 */

// Problem 1: Climbing Stairs
// Pattern: top-down dynamic programming with memoization
// Link: https://leetcode.com/problems/climbing-stairs/
const climbStairs = function (n) {
  if (n <= 2) return n;

  let prev1 = 1;
  let prev2 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }

  return prev2;
};

// Problem 2: House Robber
// Pattern: top-down dynamic programming with memoization
// Link: https://leetcode.com/problems/house-robber/
const rob = function (nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};

// Problem 3: Coin Change
// Pattern: bottom-up dynamic programming
// Link: https://leetcode.com/problems/coin-change/
const coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};

// Problem 4: Longest Increasing Subsequence
// Pattern: bottom-up dynamic programming
// Link: https://leetcode.com/problems/longest-increasing-subsequence/
const lengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);
  let maxLength = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLength = Math.max(maxLength, dp[i]);
  }

  return maxLength;
};

// Problem 5: Edit Distance
// Pattern: bottom-up dynamic programming
// Link: https://leetcode.com/problems/edit-distance/
const minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // delete
            dp[i][j - 1], // insert
            dp[i - 1][j - 1], // replace
          );
      }
    }
  }

  return dp[m][n];
};
