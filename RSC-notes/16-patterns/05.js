// ==================== 5. DFS (Depth-First Search) ====================

/**
 * Pattern: DFS
 * Depth-first traversal for trees and graphs
 */

// Problem 1: Maximum Depth of Binary Tree
// Pattern: DFS
// Link: https://leetcode.com/problems/maximum-depth-of-binary-tree/
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const maxDepth = function (root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// Problem 2: Path Sum
const hasPathSum = function (root, targetSum) {
  if (!root) return false;

  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
};

// Problem 3: Diameter of Binary Tree
// Pattern: DFS
// Link: https://leetcode.com/problems/diameter-of-binary-tree/
const diameterOfBinaryTree = function (root) {
  let diameter = 0;

  const dfs = (node) => {
    if (!node) return 0;

    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    diameter = Math.max(diameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  };

  dfs(root);
  return diameter;
};

// Problem 4: Binary Tree Paths
// Pattern: DFS
// Link: https://leetcode.com/problems/binary-tree-paths/
const binaryTreePaths = function (root) {
  const result = [];

  const dfs = (node, path) => {
    if (!node) return;

    if (!node.left && !node.right) {
      result.push(path + node.val);
      return;
    }

    dfs(node.left, path + node.val + "->");
    dfs(node.right, path + node.val + "->");
  };

  dfs(root, "");
  return result;
};

// Problem 5: Number of Islands
// Pattern: DFS
// Link: https://leetcode.com/problems/number-of-islands/
const numIslands = function (grid) {
  if (!grid.length) return 0;

  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  const dfs = (i, j) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === "0") {
      return;
    }

    grid[i][j] = "0"; // Mark as visited

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
};
