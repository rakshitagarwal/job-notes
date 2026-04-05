/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var maxDepth = function (root) {
  if (root === null) return 0;
  // depth first approach
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

var maxDepth = function (root) {
  if (root === null) return 0;
  // breadth first approach
  let depth = 0;
  let queue = [root];

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    depth++;
  }

  return depth;
};

// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// example Input: root = [3,9,20,null,null,15,7] Output: 3
// example Input: root = [1,null,2] Output: 2
