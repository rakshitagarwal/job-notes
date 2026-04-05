/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// root = [2,1,3]
var isValidBST = function (root) {
  function recurse(root, min, max) {
    // base case
    if (root === null) return true;

    if (root.val >= max || root.val <= min) {
      return false;
    }

    // recurrence relation
    return (
      recurse(root.left, min, root.val) && recurse(root.right, root.val, max)
    );
  }

  return recurse(root, -Infinity, Infinity);
};

// https://leetcode.com/problems/validate-binary-search-tree/
// example Input: root = [2,1,3] Output: true
// example Input: root = [5,1,4,null,null,3,6] Output: false
