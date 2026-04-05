var longestCommonSubsequence = function (text1, text2) {
  let m = text1.length;
  let n = text2.length;

  let dp = Array.from(Array(m + 1), () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
};

// https://leetcode.com/problems/longest-common-subsequence/
// example Input: text1 = "abcde", text2 = "ace" Output: 3
// example Input: text1 = "abc", text2 = "abc" Output: 3
// example Input: text1 = "abc", text2 = "def" Output: 0
