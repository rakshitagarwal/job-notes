// ==================== 8. DEPTH FIRST SEARCH ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/depth-first-search/introduction
 * Notes: https://www.hellointerview.com/learn/code/depth-first-search/fundamentals
 * Notes: https://www.hellointerview.com/learn/code/depth-first-search/return-values
 * Time Complexity: O(V + E) | Space Complexity: O(V)
 */

// Problem 1: Maximum Depth of Binary Tree
// Link: https://leetcode.com/problems/maximum-depth-of-binary-tree/
var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }
  // get the maximum depth of the left and right subtrees
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};

// Problem 2: Path Sum
// Link: https://leetcode.com/problems/path-sum/
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }
  const left = hasPathSum(root.left, targetSum - root.val);
  const right = hasPathSum(root.right, targetSum - root.val);
  return left || right;
};

// Problem 3: Count Good Nodes in Binary Tree
// Link: https://leetcode.com/problems/count-good-nodes-in-binary-tree/
var goodNodes = function (root) {
  function dfs(root, max) {
    if (!root) {
      return 0;
    }

    let count = 0;
    if (root.val >= max) {
      count += 1;
      max = root.val;
    }

    const left = dfs(root.left, max);
    const right = dfs(root.right, max);
    return left + right + count;
  }

  return dfs(root, -Infinity);
};

// Problem 4: Validate Binary Search Tree
// Link: https://leetcode.com/problems/validate-binary-search-tree/
function isValidBST(root) {
  function dfs(node, min, max) {
    // base case
    if (node === null) {
      return true;
    }
    // check if the current node's value is within the valid range
    if (node.val <= min || node.val >= max) {
      return false;
    }
    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  }
  return dfs(root, -Infinity, Infinity);
}

// Problem 5: Binary Tree Tilt
// Link: https://leetcode.com/problems/binary-tree-tilt/
function findTilt(root) {
  let tilt = 0;
  // define a helper function to perform the recursive calls
  // this ensures that the tilt variable is not accessible outside of the main function
  function dfs(node) {
    // base case
    if (!node) {
      return 0;
    }
    // get the sum of the current node's left and right subtrees
    const left = dfs(node.left);
    const right = dfs(node.right);
    // calculate tilt of current subtree, and add it to the global tilt variable
    tilt += Math.abs(left - right);
    // return the sum of the current subtree
    return left + right + node.val;
  }
  // initiate the call to the helper function
  dfs(root);
  return tilt;
}

// Problem 6: Diameter of Binary Tree
// Link: https://leetcode.com/problems/diameter-of-binary-tree/
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function dfs(node) {
    if (!node) {
      return 0;
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);
    return Math.max(left, right) + 1;
  }
  dfs(root);
  return maxDiameter;
}

// Problem 7: Path Sum 2
// Link: https://leetcode.com/problems/path-sum-ii/
function pathSum(root, target) {
  function dfs(node, target, path) {
    if (!node) {
      return;
    }
    path.push(node.val);
    if (!node.left && !node.right) {
      if (node.val === target) {
        result.push([...path]);
      }
    }
    dfs(node.left, target - node.val, path);
    dfs(node.right, target - node.val, path);
    path.pop();
  }
  const result = [];
  dfs(root, target, []);
  return result;
}

// Problem 8: Longest univalued path
// Link: https://leetcode.com/problems/longest-univalue-path/
function longestUnivaluePath(root) {
  let maxLength = 0;

  function dfs(node) {
    if (!node) {
      return 0;
    }

    const leftLength = dfs(node.left);
    const rightLength = dfs(node.right);
    let leftArrow = 0,
      rightArrow = 0;
    // check if children have the same value as the current node,
    // which means we can extend the univalue path by including the
    // current node
    if (node.left && node.left.val === node.val) {
      leftArrow = leftLength + 1;
    }
    if (node.right && node.right.val === node.val) {
      rightArrow = rightLength + 1;
    }
    // leftArrow + rightArrow is the length of the longest
    // univalue path that goes through the current node
    maxLength = Math.max(maxLength, leftArrow + rightArrow);
    return Math.max(leftArrow, rightArrow);
  }

  dfs(root);
  return maxLength;
}

// Notes DFS with graphs: https://www.hellointerview.com/learn/code/depth-first-search/graphs-overview
// Notes: https://www.hellointerview.com/learn/code/depth-first-search/adjacency-list

// Problem 9: Flood Fill
// Link: https://leetcode.com/problems/flood-fill/
function floodFill(image, sr, sc, color) {
  const rows = image.length;
  const cols = image[0].length;
  const originalColor = image[sr][sc];

  if (originalColor === color) {
    return image;
  }

  function dfs(r, c) {
    if (image[r][c] === originalColor) {
      image[r][c] = color;

      if (r >= 1) dfs(r - 1, c);
      if (r + 1 < rows) dfs(r + 1, c);
      if (c >= 1) dfs(r, c - 1);
      if (c + 1 < cols) dfs(r, c + 1);
    }
    return;
  }

  dfs(sr, sc);
  return image;
}

// Problem 10: Number of Islands
// Link: https://leetcode.com/problems/number-of-islands/
var numIslands = function (grid) {
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1") {
        count = count + dfs(grid, i, j);
      }
    }
  }

  function dfs(grid, row, col) {
    if (
      row < 0 ||
      row > grid.length - 1 ||
      col < 0 ||
      col > grid[row].length - 1 ||
      grid[row][col] === "0"
    ) {
      return;
    }
    grid[row][col] = "0";

    dfs(grid, row + 1, col);
    dfs(grid, row - 1, col);
    dfs(grid, row, col + 1);
    dfs(grid, row, col - 1);
    return 1;
  }

  return count ? count : 0;
};

// Problem 11: Surrounded Regions
// Link: https://leetcode.com/problems/surrounded-regions/
function solve(grid) {
  if (!grid || grid.length === 0) {
    return grid;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  // recursive function to find all the "O"s that are reachable
  // from the border and mark them as "S"
  function dfs(x, y) {
    // return immediately if the cell is out of bounds or is not an "O"
    if (x < 0 || y < 0 || x >= rows || y >= cols || grid[x][y] !== "O") {
      return;
    }
    grid[x][y] = "S";
    // explore the neighboring cells
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
  }
  // initialize the dfs for the first and last column
  for (let i = 0; i < rows; i++) {
    if (grid[i][0] === "O") {
      dfs(i, 0);
    }
    if (grid[i][cols - 1] === "O") {
      dfs(i, cols - 1);
    }
  }
  // initialize the dfs for the first and last row
  for (let j = 0; j < cols; j++) {
    if (grid[0][j] === "O") {
      dfs(0, j);
    }
    if (grid[rows - 1][j] === "O") {
      dfs(rows - 1, j);
    }
  }
  // change the "O"s that are not marked as "S" to "X"s and the "S"s back to "O"s
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "O") {
        grid[i][j] = "X";
      } else if (grid[i][j] === "S") {
        grid[i][j] = "O";
      }
    }
  }

  return grid;
}

// Problem 12: Pacific Atlantic Water Flow
// Link: https://leetcode.com/problems/pacific-atlantic-water-flow/
var pacificAtlantic = function (grid) {
  if (!grid || !grid[0]) {
    return [];
  }
  const rows = grid.length,
    cols = grid[0].length;
  // Step 1: Initialize empty sets
  const pacificReachable = new Set();
  const atlanticReachable = new Set();
  function dfs(r, c, reachable) {
    reachable.add(r + "," + c);
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (const [dr, dc] of directions) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const key = nr + "," + nc;
        if (!reachable.has(key) && grid[nr][nc] >= grid[r][c]) {
          dfs(nr, nc, reachable);
        }
      }
    }
  }
  // initializes DFS from all cells in the Atlantic and Pacific Oceans
  // Note how we share a single visited set
  // across DFS calls that originate from the same ocean
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pacificReachable);
    dfs(r, cols - 1, atlanticReachable);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pacificReachable);
    dfs(rows - 1, c, atlanticReachable);
  }
  // return the intersection of both sets.
  return Array.from(pacificReachable)
    .filter((cell) => atlanticReachable.has(cell))
    .map((cell) => cell.split(",").map(Number));
};
