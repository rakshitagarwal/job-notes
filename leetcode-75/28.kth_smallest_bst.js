/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var kthSmallest = function (root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (!node || result !== null) return;

    inorder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
};

// video solution
var kthSmallest = function (root, k) {
  let arr = [];
  inOrder(root, arr);

  return findKth(arr, k);
};

function inOrder(root, arr) {
  if (!root) return;

  inOrder(root.left, arr);
  arr.push(root.val);
  inOrder(root.right, arr);
}

function findKth(arr, k) {
  for (let i = 0; i < k; i++) {
    if (i === k - 1) return arr[i];
  }
}

// https://leetcode.com/problems/kth-smallest-element-in-a-bst/
// root = [3, 1, 4, null, 2], k = 1
// output: 1
