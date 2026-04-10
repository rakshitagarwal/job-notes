// ==================== 6. BFS (Breadth-First Search) ====================

/**
 * Pattern: BFS
 * Level-order traversal for shortest path and level-based problems
 */

// Problem 1: Binary Tree Level Order Traversal
// Pattern: BFS
// Link: https://leetcode.com/problems/binary-tree-level-order-traversal/
const levelOrder = function (root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
};

// Problem 2: Rotting Oranges
// Pattern: BFS
// Link: https://leetcode.com/problems/rotting-oranges/
const orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let freshCount = 0;
  let minutes = 0;

  // Find all rotten oranges
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      } else if (grid[i][j] === 1) {
        freshCount++;
      }
    }
  }

  if (freshCount === 0) return 0;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length && freshCount > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < rows &&
          newY >= 0 &&
          newY < cols &&
          grid[newX][newY] === 1
        ) {
          grid[newX][newY] = 2;
          freshCount--;
          queue.push([newX, newY]);
        }
      }
    }

    minutes++;
  }

  return freshCount === 0 ? minutes : -1;
};

// Problem 3: Word Ladder
// Pattern: BFS
// Link: https://leetcode.com/problems/word-ladder/
const ladderLength = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];

  while (queue.length) {
    const [word, length] = queue.shift();

    if (word === endWord) return length;

    for (let i = 0; i < word.length; i++) {
      for (let charCode = 97; charCode <= 122; charCode++) {
        const newWord =
          word.slice(0, i) + String.fromCharCode(charCode) + word.slice(i + 1);

        if (wordSet.has(newWord)) {
          queue.push([newWord, length + 1]);
          wordSet.delete(newWord);
        }
      }
    }
  }

  return 0;
};

// Problem 4: Minimum Depth of Binary Tree
// Pattern: BFS
// Link: https://leetcode.com/problems/minimum-depth-of-binary-tree/
const minDepth = function (root) {
  if (!root) return 0;

  const queue = [[root, 1]];

  while (queue.length) {
    const [node, depth] = queue.shift();

    if (!node.left && !node.right) {
      return depth;
    }

    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }

  return 0;
};

// Problem 5: Shortest Path in Binary Matrix
// Pattern: BFS
// Link: https://leetcode.com/problems/shortest-path-in-binary-matrix/
const shortestPathBinaryMatrix = function (grid) {
  if (grid[0][0] !== 0) return -1;

  const n = grid.length;
  const queue = [[0, 0, 1]]; // [row, col, distance]
  grid[0][0] = 1; // Mark as visited

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  while (queue.length) {
    const [row, col, dist] = queue.shift();

    if (row === n - 1 && col === n - 1) return dist;

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < n &&
        newCol >= 0 &&
        newCol < n &&
        grid[newRow][newCol] === 0
      ) {
        grid[newRow][newCol] = 1;
        queue.push([newRow, newCol, dist + 1]);
      }
    }
  }

  return -1;
};
