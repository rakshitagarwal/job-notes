// ==================== 11. GRAPHS  - Topological Sort ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/graphs/topological-sort
 * Time Complexity: O(V + E) | Space Complexity: O(V)
 */

// Problem 1: Course Schedule
// Link: https://leetcode.com/problems/course-schedule/
function canFinish(numCourses, prerequisites) {
  const graph = new Map();
  const inDegree = new Array(numCourses).fill(0);
  for (const [dest, src] of prerequisites) {
    if (!graph.has(src)) {
      graph.set(src, []);
    }
    graph.get(src).push(dest);
    inDegree[dest]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  let count = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    count++;

    for (const neighbor of graph.get(course) || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  return count === numCourses;
}

// Problem 2: Course Schedule II
// Link: https://leetcode.com/problems/course-schedule-ii/
function findOrder(numCourses, prerequisites) {
  const graph = new Map();
  const inDegree = new Array(numCourses).fill(0);

  for (const [dest, src] of prerequisites) {
    if (!graph.has(src)) {
      graph.set(src, []);
    }
    graph.get(src).push(dest);
    inDegree[dest]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const order = [];
  while (queue.length > 0) {
    const course = queue.shift();
    order.push(course);

    for (const neighbor of graph.get(course) || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order.length === numCourses ? order : [];
}

// NOTES about Shortest Path Algorithms

// 1. BFS when all edges are equal
// 2. Dijkstra when edges have different weights
// 3. Bellman-Ford when edges have negative weights
// 4. Floyd-Warshall: All pairs shortest path

// Problem 3: Network Delay Time
// Link: https://leetcode.com/problems/network-delay-time/
class MinimumHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][0] <= this.heap[i][0]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }

  bubbleDown() {
    let i = 0;
    const n = this.heap.length;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left;
      }
      if (right < n && this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right;
      }

      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  size() {
    return this.heap.length;
  }
}

var networkDelayTime = function (times, n, k) {
  // Step 1: Build graph
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let [u, v, w] of times) {
    graph[u].push([v, w]);
  }

  // Step 2: Distance array
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  // Step 3: Min Heap
  const heap = new MinimumHeap();
  heap.push([0, k]); // [time, node]

  while (heap.size()) {
    const [time, node] = heap.pop();

    // Skip outdated entries
    if (time > dist[node]) continue;

    for (let [neighbor, weight] of graph[node]) {
      let newTime = time + weight;

      if (newTime < dist[neighbor]) {
        dist[neighbor] = newTime;
        heap.push([newTime, neighbor]);
      }
    }
  }

  // Step 4: Get answer
  let maxTime = Math.max(...dist.slice(1));

  return maxTime === Infinity ? -1 : maxTime;
};

// Prblem 4: Cheapest Flights Within K Stops
// Link: https://leetcode.com/problems/cheapest-flights-within-k-stops/
var findCheapestPrice = function (n, flights, src, dst, k) {
  // Step 1: Build graph
  const graph = Array.from({ length: n }, () => []);

  for (let [u, v, w] of flights) {
    graph[u].push([v, w]);
  }

  // Step 2: Distance array
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  // Step 3: Queue -> [node, cost, stops]
  const queue = [[src, 0, 0]];

  while (queue.length) {
    const [node, cost, stops] = queue.shift();

    // If stops exceed limit, skip
    if (stops > k) continue;

    for (let [neighbor, price] of graph[node]) {
      let newCost = cost + price;

      // Only relax if better cost
      if (newCost < dist[neighbor]) {
        dist[neighbor] = newCost;
        queue.push([neighbor, newCost, stops + 1]);
      }
    }
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
};

// Problem 5: Path With Minimum Effort
// Link: https://leetcode.com/problems/path-with-minimum-effort/
class MinimumHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p][0] <= this.heap[i][0]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }

  bubbleDown() {
    let i = 0;
    const n = this.heap.length;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left;
      }
      if (right < n && this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right;
      }

      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  size() {
    return this.heap.length;
  }
}

var minimumEffortPath = function (heights) {
  const rows = heights.length;
  const cols = heights[0].length;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // effort matrix
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

  dist[0][0] = 0;

  const heap = new MinimumHeap();
  heap.push([0, 0, 0]); // [effort, row, col]

  while (heap.size()) {
    const [effort, r, c] = heap.pop();

    // reached destination
    if (r === rows - 1 && c === cols - 1) {
      return effort;
    }

    for (let [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;

      let currDiff = Math.abs(heights[r][c] - heights[nr][nc]);

      // 🔥 main logic
      let newEffort = Math.max(effort, currDiff);

      if (newEffort < dist[nr][nc]) {
        dist[nr][nc] = newEffort;
        heap.push([newEffort, nr, nc]);
      }
    }
  }

  return 0;
};

// Problem 6: Find City with Fewest Reachable
// Link: https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/
var findTheCity = function (n, edges, distanceThreshold) {
  // Step 1: Initialize distance matrix
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  // Step 2: Fill edges
  for (let [u, v, w] of edges) {
    dist[u][v] = w;
    dist[v][u] = w; // undirected
  }

  // Step 3: Floyd-Warshall
  for (let via = 0; via < n; via++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][via] + dist[via][j] < dist[i][j]) {
          dist[i][j] = dist[i][via] + dist[via][j];
        }
      }
    }
  }

  // Step 4: Find answer
  let minReachable = Infinity;
  let city = -1;

  for (let i = 0; i < n; i++) {
    let count = 0;

    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] <= distanceThreshold) {
        count++;
      }
    }

    // Tie → take larger index
    if (count <= minReachable) {
      minReachable = count;
      city = i;
    }
  }

  return city;
};
