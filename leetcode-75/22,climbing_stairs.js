var climbStairs = function (n) {
  let dp = [];
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    // optimal substructure
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

// https://leetcode.com/problems/climbing-stairs/
// example Input: n = 2 Output: 2
// example Input: n = 3 Output: 3

// Time complexity: O(n)
// Space complexity: O(n)
