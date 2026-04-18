// ==================== 9. BREADTH FIRST SEARCH ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/breadth-first-search/introduction
 * Notes: https://www.hellointerview.com/learn/code/breadth-first-search/fundamentals
 * Notes: https://www.hellointerview.com/learn/code/breadth-first-search/level-order-sum
 * Time Complexity: O(V + E) | Space Complexity: O(V)
 */

// Problem 1: Binary Tree Right Side View
// Link: https://leetcode.com/problems/binary-tree-right-side-view/
function rightSideView(root) {
  if (!root) {
    return [];
  }
  const nodes = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      // current node is the rightmost node
      if (i === levelSize - 1) {
        nodes.push(node.val);
      }
      // add nodes as normal to the queue
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return nodes;
}

// Problem 2: Binary Tree Zigzag Level Order Traversal
// Link: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
function zigzagLevelOrder(root) {
  if (!root) {
    return [];
  }
  const nodes = [];
  const queue = [root];
  let leftToRight = true;
  while (queue.length > 0) {
    const levelSize = queue.length;
    const nodesForLevel = [];
    // process all nodes at this level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (leftToRight) {
        // add the node to the back of the list
        nodesForLevel.push(node.val);
      } else {
        // add the node to the front of the list
        nodesForLevel.unshift(node.val);
      }
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    // we've processed all nodes at the current level
    // add them to the output list and toggle leftToRight
    // to prepare for the next level
    nodes.push(nodesForLevel);
    leftToRight = !leftToRight;
  }
  return nodes;
}

// Problem 3: Maximum Width of Binary Tree
// Link: https://leetcode.com/problems/maximum-width-of-binary-tree/
function widthOfBinaryTree(root) {
  if (!root) {
    return 0;
  }
  // enqueue the root node with position 0
  const queue = [[root, 0]];
  let maxWidth = 0;
  while (queue.length > 0) {
    const levelSize = queue.length;
    // leftPos is the position of the leftmost node at the current level
    const leftPos = queue[0][1];
    let rightPos = -1;
    for (let i = 0; i < levelSize; i++) {
      const [node, pos] = queue.shift();
      // update rightPos to the position of the rightmost node
      // when we reach the last node in the level
      if (i === levelSize - 1) {
        rightPos = pos;
      }
      // add the children to the queue with their positions
      if (node.left) {
        queue.push([node.left, 2 * pos]);
      }
      if (node.right) {
        queue.push([node.right, 2 * pos + 1]);
      }
    }

    // rightPos - leftPos + 1 is the width of the current level
    maxWidth = Math.max(maxWidth, rightPos - leftPos + 1);
  }
  return maxWidth;
}

// Notes of BFS on Graphs: https://www.hellointerview.com/learn/code/breadth-first-search/graphs-overview

// Problem 4: Rotting Oranges
// Link: https://leetcode.com/problems/rotting-oranges/
var orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const queue = [];
  let fresh = 0;

  // Step 1: Initialize
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]); // rotten
      } else if (grid[r][c] === 1) {
        fresh++; // count fresh
      }
    }
  }

  // Edge case
  if (fresh === 0) return 0;

  let minutes = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Step 2: BFS
  while (queue.length) {
    let size = queue.length;
    let infected = false;

    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();

      for (let [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < rows &&
          nc < cols &&
          grid[nr][nc] === 1
        ) {
          grid[nr][nc] = 2;
          queue.push([nr, nc]);
          fresh--;
          infected = true;
        }
      }
    }

    // Only increment if something rotted this round
    if (infected) minutes++;
  }

  return fresh === 0 ? minutes : -1;
};

// Problem 5: 01 Matrix
// Link: https://leetcode.com/problems/01-matrix/
function updateMatrix(mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const output = Array(rows)
    .fill()
    .map(() => Array(cols).fill(-1));
  const queue = [];
  // Step 1: Initialize the queue with all the 0 cells
  // set their distance to 0 in the output grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) {
        queue.push([r, c]);
        output[r][c] = 0;
      }
    }
  }
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  // Step 2: Perform BFS traversal
  let distance = 1;
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (output[nr][nc] === -1) {
            output[nr][nc] = distance;
            queue.push([nr, nc]);
          }
        }
      }
    }
    distance++;
  }
  // Step 5: Return the output grid
  return output;
}

// Problem 6: Bus Routes
// Link: https://leetcode.com/problems/bus-routes/
function numBusesToDestination(routes, source, target) {
  if (source === target) {
    return 0;
  }
  // Create a dictionary mapping bus stop to bus route index
  // These are the edges in our graph
  const busStops = new Map();
  for (let i = 0; i < routes.length; i++) {
    for (const stop of routes[i]) {
      if (!busStops.has(stop)) {
        busStops.set(stop, []);
      }
      busStops.get(stop).push(i);
    }
  }
  const visited = new Set();
  const queue = [];
  // Step 2: Initialize BFS queue and visited set
  for (const bus of busStops.get(source) || []) {
    queue.push([bus, 1]);
    visited.add(bus);
  }
  while (queue.length > 0) {
    const [currBus, numChanges] = queue.shift();

    // check if any of the bus stops in
    // the current route is the target
    for (const stop of routes[currBus]) {
      if (stop === target) {
        return numChanges;
      }

      // add neighbors to the queue
      for (const connectedBus of busStops.get(stop) || []) {
        if (!visited.has(connectedBus)) {
          queue.push([connectedBus, numChanges + 1]);
          visited.add(connectedBus);
        }
      }
    }
  }
  return -1; // No possible route found
}
