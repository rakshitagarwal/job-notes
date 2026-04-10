// ==================== 15. GREEDY ====================

/**
 * Pattern: Greedy
 * Make locally optimal choices to reach global optimum
 */

// Problem 1: Jump Game
// Pattern: Greedy
// Link: https://leetcode.com/problems/jump-game/
const canJump = function (nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }

  return true;
};

// Problem 2: Gas Station
// Pattern: Greedy
// Link: https://leetcode.com/problems/gas-station/
const canCompleteCircuit = function (gas, cost) {
  let totalGas = 0;
  let currentGas = 0;
  let startIndex = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i] - cost[i];
    currentGas += gas[i] - cost[i];

    if (currentGas < 0) {
      startIndex = i + 1;
      currentGas = 0;
    }
  }

  return totalGas >= 0 ? startIndex : -1;
};

// Problem 3: Assign Cookies
// Pattern: Greedy
// Link: https://leetcode.com/problems/assign-cookies/
const findContentChildren = function (g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let childIndex = 0;
  let cookieIndex = 0;

  while (childIndex < g.length && cookieIndex < s.length) {
    if (s[cookieIndex] >= g[childIndex]) {
      childIndex++;
    }
    cookieIndex++;
  }

  return childIndex;
};

// Problem 4: Partition Labels
// Pattern: Greedy
// Link: https://leetcode.com/problems/partition-labels/
const partitionLabels = function (s) {
  const lastOccurrence = new Map();

  for (let i = 0; i < s.length; i++) {
    lastOccurrence.set(s[i], i);
  }

  const result = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastOccurrence.get(s[i]));

    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
};

// Problem 5: Candy
// Pattern: Greedy
// Link: https://leetcode.com/problems/candy/
const candy = function (ratings) {
  const candies = new Array(ratings.length).fill(1);

  // Left to right
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right to left
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((sum, c) => sum + c, 0);
};
