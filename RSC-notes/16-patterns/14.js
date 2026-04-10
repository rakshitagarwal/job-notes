// ==================== 14. MATRIX TRAVERSAL ====================

/**
 * Pattern: Matrix Traversal
 * Used for grid-based DFS/BFS problems
 */

// Problem 1: Set Matrix Zeroes
// Pattern: Matrix Traversal
// Psudo Code: https://programguru.org/dsa/set-matrix-zeroes-optimal/
// Link: https://leetcode.com/problems/set-matrix-zeroes/

var setZeroes = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;

  let firstRowZero = false;
  let firstColZero = false;

  // Step 1: check first row
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowZero = true;
      break;
    }
  }

  // Step 2: check first column
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColZero = true;
      break;
    }
  }

  // Step 3: mark rows & columns
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // mark row
        matrix[0][j] = 0; // mark col
      }
    }
  }

  // Step 4: apply markers (rows)
  for (let i = 1; i < m; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 1; j < n; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  // Step 5: apply markers (cols)
  for (let j = 1; j < n; j++) {
    if (matrix[0][j] === 0) {
      for (let i = 1; i < m; i++) {
        matrix[i][j] = 0;
      }
    }
  }

  // Step 6: fix first row
  if (firstRowZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // Step 7: fix first column
  if (firstColZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
};

// Problem 2: Flood Fill
// Pattern: DFS
// Link: https://leetcode.com/problems/flood-fill/
const floodFill = function (image, sr, sc, color) {
  const originalColor = image[sr][sc];
  if (originalColor === color) return image;

  const rows = image.length;
  const cols = image[0].length;

  const dfs = (i, j) => {
    if (
      i < 0 ||
      i >= rows ||
      j < 0 ||
      j >= cols ||
      image[i][j] !== originalColor
    ) {
      return;
    }

    image[i][j] = color;

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  dfs(sr, sc);
  return image;
};

// Problem 3: 01 Matrix
// Pattern: BFS
// Link: https://leetcode.com/problems/01-matrix/
const updateMatrix = function (mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const queue = [];
  const dist = Array(rows)
    .fill()
    .map(() => Array(cols).fill(Infinity));

  // Initialize queue with all zeros
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // BFS
  while (queue.length) {
    const [i, j] = queue.shift();

    for (const [di, dj] of directions) {
      const ni = i + di;
      const nj = j + dj;

      if (
        ni >= 0 &&
        ni < rows &&
        nj >= 0 &&
        nj < cols &&
        dist[ni][nj] > dist[i][j] + 1
      ) {
        dist[ni][nj] = dist[i][j] + 1;
        queue.push([ni, nj]);
      }
    }
  }

  return dist;
};

// Problem 4: Surrounded Regions
// Pattern: DFS
// Link: https://leetcode.com/problems/surrounded-regions/
const solve = function (board) {
  if (!board.length || !board[0].length) return;

  const rows = board.length;
  const cols = board[0].length;

  const dfs = (i, j) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== "O") {
      return;
    }

    board[i][j] = "#";

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  // Mark border-connected 'O's
  for (let i = 0; i < rows; i++) {
    dfs(i, 0);
    dfs(i, cols - 1);
  }

  for (let j = 0; j < cols; j++) {
    dfs(0, j);
    dfs(rows - 1, j);
  }

  // Flip remaining 'O's to 'X' and restore '#'
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === "O") {
        board[i][j] = "X";
      } else if (board[i][j] === "#") {
        board[i][j] = "O";
      }
    }
  }
};

// Problem 5: Pacific Atlantic Water Flow
// Pattern: DFS
// Link: https://leetcode.com/problems/pacific-atlantic-water-flow/
const pacificAtlantic = function (heights) {
  if (!heights.length || !heights[0].length) return [];

  const rows = heights.length;
  const cols = heights[0].length;
  const pacific = Array(rows)
    .fill()
    .map(() => Array(cols).fill(false));
  const atlantic = Array(rows)
    .fill()
    .map(() => Array(cols).fill(false));

  const dfs = (i, j, visited, prevHeight) => {
    if (
      i < 0 ||
      i >= rows ||
      j < 0 ||
      j >= cols ||
      visited[i][j] ||
      heights[i][j] < prevHeight
    ) {
      return;
    }

    visited[i][j] = true;

    dfs(i + 1, j, visited, heights[i][j]);
    dfs(i - 1, j, visited, heights[i][j]);
    dfs(i, j + 1, visited, heights[i][j]);
    dfs(i, j - 1, visited, heights[i][j]);
  };

  // Start from borders
  for (let i = 0; i < rows; i++) {
    dfs(i, 0, pacific, heights[i][0]);
    dfs(i, cols - 1, atlantic, heights[i][cols - 1]);
  }

  for (let j = 0; j < cols; j++) {
    dfs(0, j, pacific, heights[0][j]);
    dfs(rows - 1, j, atlantic, heights[rows - 1][j]);
  }

  const result = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
};
