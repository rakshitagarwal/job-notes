var countComponents = function (n, edges) {
  let count = 0;
  let graph = {};
  let visited = new Set();
  for (let i = 0; i < n; i++) graph[i] = [];

  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  function dfs(node) {
    if (visited.has(node)) return 0;
    visited.add(node);
    for (let n of graph[node]) {
      dfs(n);
    }
    return 1;
  }

  for (let key in graph) {
    key = Number(key);
    count += dfs(key);
  }

  return count;
};

// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
// example 1
// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2
