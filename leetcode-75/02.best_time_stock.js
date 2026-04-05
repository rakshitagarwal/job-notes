var maxProfit = function (prices) {
  let curMin = prices[0];
  let curMax = 0;

  for (let i = 0; i < prices.length; i++) {
    curMin = Math.min(prices[i], curMin);
    curMax = Math.max(curMax, prices[i] - curMin);
  }

  return curMax;
};

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock
// example Input: prices = [7,1,5,3,6,4] Output: 5
// example Input: prices = [7,6,4,3,1] Output: 0
