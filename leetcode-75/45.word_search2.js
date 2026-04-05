var findWords = function (board, words) {
  const root = {};
  const result = new Set();
  const m = board.length;
  const n = board[0].length;

  words.forEach(
    (w) => (w.split("").reduce((n, c) => (n[c] = n[c] || {}), root).word = w),
  );

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, root);
    }
  }

  return Array.from(result);

  function dfs(i, j, node) {
    const char = board[i][j];
    const next = node[char];
    if (!next) return;
    if (next.word) {
      result.add(next.word);
    }
    board[i][j] = "#";
    for (const [di, dj] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      if (
        i + di >= 0 &&
        i + di < m &&
        j + dj >= 0 &&
        j + dj < n &&
        board[i + di][j + dj] !== "#"
      ) {
        dfs(i + di, j + dj, next);
      }
    }
    board[i][j] = char;
  }
};

// https://leetcode.com/problems/word-search-ii/
// Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]
