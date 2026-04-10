// ==================== 8. BACKTRACKING ====================

/**
 * Pattern: Backtracking
 * Used for generating all combinations/permutations
 */

// Problem 1: Subsets
// Pattern: Backtracking
// Link: https://leetcode.com/problems/subsets/
const subsets = function (nums) {
  const result = [];

  const backtrack = (start, current) => {
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  };

  backtrack(0, []);
  return result;
};

// Problem 2: Permutations
// Pattern: Backtracking
// Link: https://leetcode.com/problems/permutations/
const permute = function (nums) {
  const result = [];

  const backtrack = (current) => {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (current.includes(nums[i])) continue;
      current.push(nums[i]);
      backtrack(current);
      current.pop();
    }
  };

  backtrack([]);
  return result;
};

// Problem 3: Combination Sum
// Pattern: Backtracking
// Link: https://leetcode.com/problems/combination-sum/
const combinationSum = function (candidates, target) {
  const result = [];

  const backtrack = (start, current, sum) => {
    if (sum === target) {
      result.push([...current]);
      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, sum + candidates[i]);
      current.pop();
    }
  };

  backtrack(0, [], 0);
  return result;
};

// Problem 4: N-Queens
// Pattern: Backtracking
// Link: https://leetcode.com/problems/n-queens/
const solveNQueens = function (n) {
  const result = [];
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));

  const isValid = (row, col) => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
    }

    // Check diagonal (top-left to bottom-right)
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }

    // Check anti-diagonal (top-right to bottom-left)
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }

    return true;
  };

  const backtrack = (row) => {
    if (row === n) {
      result.push(board.map((row) => row.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = ".";
      }
    }
  };

  backtrack(0);
  return result;
};

// Problem 5: Word Search
// Pattern: Backtracking
// Link: https://leetcode.com/problems/word-search/
const exist = function (board, word) {
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (i, j, index) => {
    if (index === word.length) return true;
    if (
      i < 0 ||
      i >= rows ||
      j < 0 ||
      j >= cols ||
      board[i][j] !== word[index]
    ) {
      return false;
    }

    const temp = board[i][j];
    board[i][j] = "#"; // Mark as visited

    const found =
      dfs(i + 1, j, index + 1) ||
      dfs(i - 1, j, index + 1) ||
      dfs(i, j + 1, index + 1) ||
      dfs(i, j - 1, index + 1);

    board[i][j] = temp; // Backtrack
    return found;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
};
