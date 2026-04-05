var isSubtree = function (root, subRoot) {
  function isSame(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2 || root1.val !== root2.val) return false;
    return isSame(root1.left, root2.left) && isSame(root1.right, root2.right);
  }

  function dfs(node) {
    if (!node) return false;
    if (isSame(node, subRoot)) return true;
    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
};

// https://leetcode.com/problems/subtree-of-another-tree/
// example Input: root = [3,4,5,1,2], subRoot = [4,1,2] Output: true
