var uniquePaths = function (m, n) {
  let dp = Array.from(Array(m), () => new Array(n));
  // first row and first col set to 1
  for (let i = 0; i < dp.length; i++) dp[i][0] = 1;
  for (let i = 0; i < dp[0].length; i++) dp[0][i] = 1;

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      // add left and top to reach current
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  // final location to reach
  return dp[m - 1][n - 1];
};

// https://leetcode.com/problems/unique-paths/
// m = 3, n = 2
// output: 3

// m = 3, n = 7
// output: 28
