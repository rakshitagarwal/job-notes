// ==================== 10. BACKTRACKING ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/backtracking/overview
 * Time Complexity: O(n!) | Space Complexity: O(n)
 */

// Problem 1: Word Search
// Link: https://leetcode.com/problems/word-search/
// Time Complexity: O(4^n) | Space Complexity: O(n)
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  function dfs(r, c, index) {
    if (index === word.length) {
      return true;
    }
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      board[r][c] !== word[index]
    ) {
      return false;
    }
    const temp = board[r][c];
    board[r][c] = "#";
    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);
    board[r][c] = temp;
    return found;
  }
  // initialize depth-first search from
  // each of the cells that have the same first
  // letter as word
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === word[0]) {
        if (dfs(row, col, 0)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Problem 2: Solution Space Trees
// Link: https://www.hellointerview.com/learn/code/backtracking/solution-space-trees

// Problem 3: Subsets
// Link: https://leetcode.com/problems/subsets/description/
function subsets(nums) {
  function dfs(index, path) {
    if (index === nums.length) {
      result.push([...path]);
      return;
    }

    // include nums[index]
    path.push(nums[index]);
    dfs(index + 1, path);

    // exclude nums[index]
    path.pop();
    dfs(index + 1, path);
  }

  const result = [];
  dfs(0, []);
  return result;
}

// Problem 4: Generate Parentheses
// Link: https://leetcode.com/problems/generate-parentheses/
function generateParenthesis(n) {
  const res = [];

  function dfs(s, open, close) {
    // base case
    if (s.length === 2 * n) {
      res.push(s);
      return;
    }

    if (open < n) {
      // add an opening parenthesis and increment the open count
      dfs(s + "(", open + 1, close);
    }

    if (close < open) {
      // add a closing parenthesis and increment the close count
      dfs(s + ")", open, close + 1);
    }
  }

  dfs("", 0, 0);
  return res;
}

// Problem 5: Combination Sum
// Link: https://leetcode.com/problems/combination-sum/
function combinationSum(candidates, target) {
  function backtrack(start, combo, currentTarget) {
    if (currentTarget === 0) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      const curr = candidates[i];
      if (candidates[i] > currentTarget) {
        return;
      }
      combo.push(curr);
      backtrack(i, combo, currentTarget - curr);
      combo.pop();
    }
    return;
  }
  candidates.sort((a, b) => a - b);
  const result = [];
  backtrack(0, [], target);
  return result;
}

// Problem 6: Palindrome Partitioning
// Link: https://leetcode.com/problems/palindrome-partitioning/
var partition = function (s) {
  const result = [];

  // Helper to check palindrome
  function isPalindrome(left, right) {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(start, path) {
    // Base case: reached end
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      // Choose only if palindrome
      if (isPalindrome(start, end)) {
        path.push(s.substring(start, end + 1));

        // Explore
        backtrack(end + 1, path);

        // Undo (backtrack)
        path.pop();
      }
    }
  }

  backtrack(0, []);
  return result;
};

// Problem 7: N-Queens
// Link: https://leetcode.com/problems/n-queens/
var solveNQueens = function (n) {
  const result = [];

  // Track attacks
  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col

  // Create empty board
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  function backtrack(row) {
    // Base case: all queens placed
    if (row === n) {
      // Convert board to string format
      result.push(board.map((r) => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      // Check if safe
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col))
        continue;

      // Place queen
      board[row][col] = "Q";
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      // Explore
      backtrack(row + 1);

      // Backtrack
      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0);
  return result;
};
