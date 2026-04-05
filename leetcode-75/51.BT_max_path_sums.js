var maxPathSum = function (root) {
  let max = -Infinity;

  function dfs(root) {
    if (!root) return 0;

    let left = Math.max(0, dfs(root.left)); // Ignore negative paths
    let right = Math.max(0, dfs(root.right)); // Ignore negative paths

    const curMax = left + root.val + right;

    max = Math.max(curMax, max);

    return root.val + Math.max(left, right);
  }
  dfs(root);
  return max;
};

// https://leetcode.com/problems/binary-tree-maximum-path-sum/
// example Input: root = [1,2,3]
// Output: 6

// Input: root = [-10,9,20,null,null,15,7]
// Output: 42
