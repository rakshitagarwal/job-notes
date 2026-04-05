var levelOrder = function (root) {
  if (root === null) return [];

  let res = [];
  let queue = [root];

  while (queue.length) {
    let levelArr = [];
    let levelSize = queue.length;

    while (levelSize) {
      let current = queue.shift();

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      levelArr.push(current.val);
      levelSize--;
    }

    res.push(levelArr);
  }

  return res;
};

// https://leetcode.com/problems/binary-tree-level-order-traversal
// example Input: root = [3,9,20,null,null,15,7] Output: [[3],[9,20],[15,7]]
// example Input: root = [1] Output: [[1]]
// example Input: root = [] Output: []
