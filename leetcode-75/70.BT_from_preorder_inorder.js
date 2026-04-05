var buildTree = function (preorder, inorder) {
  function recurse(pStart, pEnd, inStart, inEnd) {
    // base case
    if (pStart > pEnd || inStart > inEnd) return null;

    let rootVal = preorder[pStart];
    let inIndex = inorder.indexOf(rootVal);
    let nLeft = inIndex - inStart;

    let root = new TreeNode(rootVal);

    root.left = recurse(pStart + 1, pStart + nLeft, inStart, inEnd - 1);
    root.right = recurse(pStart + nLeft + 1, pEnd, inIndex + 1, inEnd);
    return root;
  }

  return recurse(0, preorder.length - 1, 0, inorder.length - 1);
};

// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
