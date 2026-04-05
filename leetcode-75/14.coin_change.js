// dynamic programming: bottom up
var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity);

  // base case
  dp[0] = 0;

  for (let curAmount = 1; curAmount <= amount; curAmount++) {
    for (let coin of coins) {
      if (curAmount - coin >= 0) {
        dp[curAmount] = Math.min(dp[curAmount], 1 + dp[curAmount - coin]);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
};

// https://leetcode.com/problems/coin-change
// example Input: coins = [1,2,5], amount = 11 Output: 3
// example Input: coins = [2], amount = 3 Output: -1
// example Input: coins = [1], amount = 0 Output: 0
