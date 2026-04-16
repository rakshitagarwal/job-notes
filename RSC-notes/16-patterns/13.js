// ==================== 13. GREEDY ALGORITHMS ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/greedy/overview
 * Time Complexity: O(n) | Space Complexity: O(1)
 */

// Problem 1: Best Time to Buy and Sell Stock
// Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
function maxProfit(prices) {
  if (prices.length === 0) {
    return 0;
  }

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
  }

  return maxProfit;
}

// Problem 2: Gas Station
// Link: https://leetcode.com/problems/gas-station/
var canCompleteCircuit = function (gas, cost) {
  if (gas.reduce((a, b) => a + b, 0) < cost.reduce((a, b) => a + b, 0)) {
    return -1;
  }

  let start = 0,
    fuel = 0;
  for (let i = 0; i < gas.length; i++) {
    if (fuel + gas[i] - cost[i] < 0) {
      // can't reach next station:
      // try starting from next station
      start = i + 1;
      fuel = 0;
    } else {
      // can reach next station:
      // update remaining fuel
      fuel += gas[i] - cost[i];
    }
  }

  return start;
};

// Problem 3: Jump Game
// Link: https://leetcode.com/problems/jump-game/
var canJump = function (nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) {
      return false;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
};

// Problem 4: Jump Game II
// Link: https://leetcode.com/problems/jump-game-ii/
var jump = function (nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  // no need to go till last index
  for (let i = 0; i < nums.length - 1; i++) {
    // update farthest reach
    farthest = Math.max(farthest, i + nums[i]);

    // when we reach end of current jump
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
};

// Problem 5: Partition Labels
// Link: https://leetcode.com/problems/partition-labels/
var partitionLabels = function (s) {
  // Step 1: Last occurrence map
  const lastIndex = {};

  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }

  const result = [];
  let start = 0;
  let end = 0;

  // Step 2: Greedy traversal
  for (let i = 0; i < s.length; i++) {
    // expand partition
    end = Math.max(end, lastIndex[s[i]]);

    // when partition closes
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
};
