var cloneGraph = function (node) {
  let visited = {};

  function dfs(node) {
    if (!node) return node;
    if (!!visited[node.val]) return visited[node.val];
    let root = new Node(node.val);
    visited[node.val] = root;
    for (let neighbor of node.neighbors) {
      root.neighbors.push(dfs(neighbor));
    }
    return root;
  }
  return dfs(node);
};

// video solution
var cloneGraph = function (node) {
  let visited = {};

  function dfs(node) {
    // base cases
    if (!node) return node;
    if (!!visited[node.val]) return visited[node.val];

    let root = new Node(node.val);
    visited[node.val] = root;

    // recurrence relation
    for (let neighbor of node.neighbors) {
      root.neighbors.push(dfs(neighbor));
    }
    return root;
  }
  return dfs(node);
};

// https://leetcode.com/problems/clone-graph/
// example 1
// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
