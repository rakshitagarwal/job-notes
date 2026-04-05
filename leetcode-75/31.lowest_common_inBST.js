/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

var lowestCommonAncestor = function (root, p, q) {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else {
    return root;
  }
};

// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
// [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// output: 6

// [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// output: 2
