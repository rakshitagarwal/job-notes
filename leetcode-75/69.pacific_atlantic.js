var pacificAtlantic = function (heights) {
  const result = [];
  const pacific = new Set();
  const atlantic = new Set();

  for (let i = 0; i < heights.length; i++) {
    dfs(i, 0, pacific);
    dfs(i, heights[0].length - 1, atlantic);
  }
  for (let j = 0; j < heights[0].length; j++) {
    dfs(0, j, pacific);
    dfs(heights.length - 1, j, atlantic);
  }

  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[0].length; j++) {
      const key = `${i},${j}`;
      if (pacific.has(key) && atlantic.has(key)) {
        result.push([i, j]);
      }
    }
  }
  return result;
  function dfs(r, c, ocean) {
    const key = `${r},${c}`;
    if (ocean.has(key)) return;
    ocean.add(key);
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nr, nc]) => {
      if (
        nr >= 0 &&
        nr < heights.length &&
        nc >= 0 &&
        nc < heights[0].length &&
        heights[nr][nc] >= heights[r][c]
      ) {
        dfs(nr, nc, ocean);
      }
    });
  }
};

// https://leetcode.com/problems/pacific-atlantic-water-flow/
// Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
