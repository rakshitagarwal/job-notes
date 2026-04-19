// ==================== 16. MATRICES ====================

// Problem 1: Spiral Matrix
// Link: https://leetcode.com/problems/spiral-matrix/
function spiralOrder(matrix) {
  let result = [];
  while (matrix.length > 0) {
    result = result.concat(matrix.shift());
    if (matrix.length > 0 && matrix[0].length > 0) {
      for (let row of matrix) {
        result.push(row.pop());
      }
    }
    if (matrix.length > 0) {
      result = result.concat(matrix.pop().reverse());
    }
    if (matrix.length > 0 && matrix[0].length > 0) {
      for (let i = matrix.length - 1; i >= 0; i--) {
        result.push(matrix[i].shift());
      }
    }
  }
  return result;
}

// Problem 2: Rotate Image
// Link: https://leetcode.com/problems/rotate-image/
var rotate = function (matrix) {
    const n = matrix.length;
    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = 
                [matrix[j][i], matrix[i][j]];
        }
    }
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
    return matrix;
}

// Problem 3: Set Matrix Zeroes
// Link: https://leetcode.com/problems/set-matrix-zeroes/
var setZeroes = function(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let firstRowZero = false;
    let firstColZero = false;
    for (let j = 0; j < cols; j++) {
        if (matrix[0][j] === 0) firstRowZero = true;
    }
    for (let i = 0; i < rows; i++) {
        if (matrix[i][0] === 0) firstColZero = true;
    }
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    if (firstRowZero) {
        for (let j = 0; j < cols; j++) {
            matrix[0][j] = 0;
        }
    }
    if (firstColZero) {
        for (let i = 0; i < rows; i++) {
            matrix[i][0] = 0;
        }
    }
}