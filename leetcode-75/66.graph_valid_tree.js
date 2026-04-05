var validTree = function (n, edges) {
  let adjList = {};

  for (let i = 0; i < n; i++) {
    adjList[i] = [];
  }

  for (let [a, b] of edges) {
    adjList[a].push(b);
    adjList[b].push(a);
  }

  let visited = new Set();

  function checkCycle(current, parent) {
    visited.add(current);
    let neighbours = adjList[current];

    if (neighbours.length) {
      for (let neigh of neighbours) {
        if (visited.has(neigh)) {
          if (neigh !== parent) return true;
        } else {
          if (checkCycle(neigh, current)) return true;
        }
      }
    }
    return false;
  }

  if (checkCycle(0, -1)) return false;

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) return false;
  }

  return true;
};

// https://leetcode.com/problems/graph-valid-tree/
// example Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]] Output: true
// example Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]] Output: false
