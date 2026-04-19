# DSA Patterns

| **Pattern**      | **Key Signal**          | **Time**      | **Space**    | **Best For**               |
| ---------------- | ----------------------- | ------------- | ------------ | -------------------------- |
| Two Pointers     | Sorted array, pairs     | O(n)          | O(1)         | Pair sum, palindrome       |
| Sliding Window   | Subarray, substring     | O(n)          | O(k)         | Longest/shortest substring |
| Fast & Slow      | Cycle, middle           | O(n)          | O(1)         | Linked list cycles         |
| Binary Search    | Sorted, search space    | O(log n)      | O(1)         | Search, optimization       |
| DFS              | Connectivity, paths     | O(V+E)        | O(h)         | Tree/graph traversal       |
| BFS              | Shortest path, levels   | O(V+E)        | O(w)         | Level order, min steps     |
| DP               | Overlapping subproblems | O(n²) typical | O(n)         | Optimization, counting     |
| Backtracking     | All combinations        | Exponential   | O(n)         | Permutations, puzzles      |
| Heap             | Top K, median           | O(log n) op   | O(k)         | Priority, streaming        |
| Monotonic Stack  | Next greater/smaller    | O(n)          | O(n)         | Histogram, water           |
| Union Find       | Connected components    | O(α(n))       | O(n)         | Dynamic connectivity       |
| Trie             | Prefix search           | O(L)          | O(sum L)     | Autocomplete               |
| Bit Manipulation | XOR, bit counting       | O(n)          | O(1)         | Unique numbers, subsets    |
| Matrix Traversal | Grid problems           | O(rows×cols)  | O(rows×cols) | Islands, flood fill        |
| Greedy           | Local optimum           | O(n log n)    | O(1)         | Interval scheduling        |
| Prefix Sum       | Range queries           | O(1) query    | O(n)         | Subarray sum, range sum    |

---

# 16 DSA Patterns for LeetCode

A comprehensive reference for the most important algorithmic patterns. Each pattern includes a description, when to use it, and a JavaScript implementation.

---

## 1. Two Pointers

**Description:**
Use two index pointers that move toward each other or in the same direction to scan an array. Reduces brute-force O(n²) solutions down to O(n). Works best on sorted arrays or problems that involve pairing elements.

**When to use:**

- Input is sorted
- Looking for a pair that satisfies a condition
- Need to compare elements from both ends

**Common Problems:** Two Sum II, Container With Most Water, Valid Palindrome, 3Sum, Trapping Rain Water

```jsx
// LC 167 - Two Sum II (sorted input)
function twoSum(numbers, target) {
  let left = 0,
    right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    else if (sum < target) left++;
    else right--;
  }
}
```

---

## 2. Sliding Window

**Description:**
Maintain a window (subarray or substring) that expands and shrinks based on a constraint. Avoids recomputing from scratch each step — O(n) instead of O(n·k).

**When to use:**

- Max/min subarray of length k
- Longest/shortest substring with a property
- Counting subarrays that satisfy a condition

**Common Problems:** Longest Substring Without Repeating Characters, Max Sum Subarray of Size K, Minimum Window Substring, Permutation in String

```jsx
// LC 3 - Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0,
    max = 0;
  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right])) left = Math.max(left, seen.get(s[right]) + 1);
    seen.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}
```

---

## 3. Fast & Slow Pointer

**Description:**
Two pointers move at different speeds (1x and 2x). If there is a cycle, they will eventually meet. If not, the fast pointer reaches the end. Also useful for finding the midpoint of a linked list.

**When to use:**

- Detect cycle in linked list
- Find middle of linked list
- Problems involving periodic structure (Happy Number)

**Common Problems:** Linked List Cycle, Find Middle of List, Happy Number, Find Cycle Start

```jsx
// LC 141 - Linked List Cycle Detection
function hasCycle(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Finding middle: slow pointer lands at midpoint
function findMiddle(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
```

---

## 4. Binary Search

**Description:**
Repeatedly halve the search space to find a target in O(log n). Can be applied on sorted arrays or on an "answer space" — binary search on the minimum/maximum value that satisfies a condition.

**When to use:**

- Sorted array lookup
- Find first/last occurrence
- Minimize/maximize a value subject to a condition

**Common Problems:** Search in Rotated Array, Find Peak Element, Koko Eating Bananas, Binary Search on Answer

```jsx
// Classic binary search template
function binarySearch(nums, target) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Binary search on answer (LC 875 - Koko Eating Bananas)
// lo = 1, hi = max(piles)
// condition: canFinish(speed) -> shrink right if true, grow left if false
```

---

## 5. DFS (Depth-First Search)

**Description:**
Explore as deep as possible along one branch before backtracking. Used for traversals, path finding, cycle detection, and connected components. Can be implemented recursively or with an explicit stack.

**When to use:**

- Tree/graph traversal
- Finding all paths
- Connected components
- Topological sort

**Common Problems:** Number of Islands, Max Depth of Binary Tree, Path Sum, Clone Graph, Course Schedule

```jsx
// LC 200 - Number of Islands (DFS on matrix)
function numIslands(grid) {
  let count = 0;
  const dfs = (r, c) => {
    if (
      r < 0 ||
      c < 0 ||
      r >= grid.length ||
      c >= grid[0].length ||
      grid[r][c] !== "1"
    )
      return;
    grid[r][c] = "0"; // mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[0].length; c++)
      if (grid[r][c] === "1") {
        dfs(r, c);
        count++;
      }
  return count;
}
```

---

## 6. BFS (Breadth-First Search)

**Description:**
Explore all neighbors at the current depth before moving deeper. Uses a queue (FIFO). Guarantees the shortest path in unweighted graphs.

**When to use:**

- Shortest path in unweighted graph
- Level-order traversal
- Multi-source propagation

**Common Problems:** Binary Tree Level Order, Shortest Path in Maze, Word Ladder, Rotting Oranges, Open Lock

```jsx
// LC 102 - Binary Tree Level Order Traversal
function levelOrder(root) {
  if (!root) return [];
  const result = [],
    queue = [root];
  while (queue.length) {
    const levelSize = queue.length,
      level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

---

## 7. Dynamic Programming

**Description:**
Break problems into overlapping subproblems and cache (memoize) results to avoid recomputation. Two styles: top-down (recursion + memo) and bottom-up (tabulation). Recognize DP by: optimal substructure + overlapping subproblems.

**When to use:**

- Count ways / find min or max
- Decisions at each step affect future options
- String matching or sequence problems

**Common Problems:** Climbing Stairs, Coin Change, Longest Common Subsequence, House Robber, 0/1 Knapsack

```jsx
// LC 322 - Coin Change (bottom-up DP)
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

---

## 8. Backtracking

**Description:**
Systematically explore all candidates by building a solution incrementally. Abandon ("prune") paths that cannot possibly lead to a valid answer. Core template: choose → explore → unchoose.

**When to use:**

- Generate all subsets, permutations, or combinations
- Constraint satisfaction (N-Queens, Sudoku)
- Word search on a grid

**Common Problems:** Subsets, Permutations, Combination Sum, N-Queens, Word Search

```jsx
// LC 78 - Subsets (backtracking)
function subsets(nums) {
  const result = [];
  const backtrack = (start, current) => {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]); // choose
      backtrack(i + 1, current); // explore
      current.pop(); // unchoose
    }
  };
  backtrack(0, []);
  return result;
}
```

---

## 9. Heap (Priority Queue)

**Description:**
A heap gives O(log n) insert and O(1) peek of the min or max element. Use for top-K problems, scheduling, or merging sorted lists. JavaScript has no built-in heap — implement with an array.

**When to use:**

- Find Kth largest/smallest
- Repeatedly access min/max as data changes
- Merge K sorted streams

**Common Problems:** Kth Largest Element, Top K Frequent, Merge K Sorted Lists, Find Median from Stream

```jsx
// Min-Heap implementation in JS
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (i * 2 + 1 < n) {
      let s = i * 2 + 1;
      if (s + 1 < n && this.heap[s + 1] < this.heap[s]) s++;
      if (this.heap[i] <= this.heap[s]) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
  }
}
```

---

## 10. Monotonic Stack

**Description:**
Maintain a stack whose elements are always in strictly increasing or decreasing order. When a new element breaks the order, pop until order is restored — those popped elements have found their "next greater/smaller" answer. O(n) amortized.

**When to use:**

- Next greater / next smaller element
- Largest rectangle in histogram
- Stock span problems

**Common Problems:** Daily Temperatures, Largest Rectangle in Histogram, Next Greater Element, Trapping Rain Water

```jsx
// LC 739 - Daily Temperatures (next warmer day)
function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = []; // stores indices
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack.at(-1)]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}
```

---

## 11. Union Find (Disjoint Set Union)

**Description:**
Efficiently groups elements into sets and answers "are these two nodes connected?" queries. Uses path compression and union by rank to achieve near O(1) per operation. Best for dynamic connectivity.

**When to use:**

- Detect cycle in undirected graph
- Count connected components
- Merge groups / accounts

**Common Problems:** Number of Provinces, Redundant Connection, Accounts Merge, Number of Islands II

```jsx
// Union-Find with path compression + union by rank
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x, y) {
    const [px, py] = [this.find(x), this.find(y)];
    if (px === py) return false;
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else {
      this.parent[py] = px;
      this.rank[px]++;
    }
    return true;
  }
}
```

---

## 12. Trie (Prefix Tree)

**Description:**
A tree where each node represents a single character. Enables O(L) insert and search where L is the word length. Ideal for autocomplete, prefix matching, and word dictionaries.

**When to use:**

- Prefix search or autocomplete
- Store a set of words for fast lookup
- Find words sharing a common prefix

**Common Problems:** Implement Trie, Word Search II, Design Add/Search Words, Replace Words, Prefix Count

```jsx
// LC 208 - Implement Trie
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }
}
```

---

## 13. Bit Manipulation

**Description:**
Operate directly on binary representations using XOR, AND, OR, NOT, and bit shifts. XOR cancels out duplicate values. AND with `n-1` clears the lowest set bit. Shifts multiply or divide by powers of 2. Often enables O(1) space tricks.

**When to use:**

- Find single/unique number in array
- Count set bits
- Check power of two
- Add without arithmetic operators

**Common Problems:** Single Number, Number of 1 Bits, Reverse Bits, Missing Number, Sum of Two Integers

```jsx
// LC 136 - Single Number: XOR cancels pairs
const singleNumber = (nums) => nums.reduce((a, b) => a ^ b, 0);

// LC 191 - Number of 1 Bits (Hamming weight)
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  } // clears lowest set bit each time
  return count;
}

// LC 268 - Missing Number (XOR indices and values)
function missingNumber(nums) {
  let res = nums.length;
  nums.forEach((n, i) => (res ^= i ^ n));
  return res;
}
```

---

## 14. Matrix Traversal

**Description:**
Treat a 2D grid as a graph where each cell connects to its neighbors. Combine with DFS or BFS for flood fill, region counting, and shortest paths. Use a direction array for clean neighbor iteration. Always validate boundaries.

**When to use:**

- Region/island counting on a grid
- Shortest path in a maze
- Spiral, diagonal, or rotation traversals

**Common Problems:** Spiral Matrix, Rotate Image, Set Matrix Zeroes, Pacific Atlantic Water Flow, Walls and Gates

```jsx
// Direction array pattern (4-directional)
const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const inBounds = (r, c, grid) =>
  r >= 0 && c >= 0 && r < grid.length && c < grid[0].length;

// LC 54 - Spiral Matrix
function spiralOrder(matrix) {
  const result = [];
  let top = 0,
    bottom = matrix.length - 1;
  let left = 0,
    right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }
  return result;
}
```

---

## 15. Greedy

**Description:**
Always pick the locally optimal choice at each step, trusting it leads to the global optimum. No backtracking. Works only when the problem has the greedy-choice property — verify this before applying. Usually one pass, O(n).

**When to use:**

- Jump/reach problems
- Interval scheduling / merging
- Minimizing cost with sorted order

**Common Problems:** Jump Game, Merge Intervals, Gas Station, Assign Cookies, Partition Labels

```jsx
// LC 55 - Jump Game (greedy max reach)
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}

// LC 56 - Merge Intervals
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (const [s, e] of intervals.slice(1)) {
    if (s <= res.at(-1)[1]) res.at(-1)[1] = Math.max(res.at(-1)[1], e);
    else res.push([s, e]);
  }
  return res;
}
```

---

## 16. Prefix Sum

**Description:**
Build an array where each index stores the cumulative sum of all elements up to that point. Any range sum `[i..j]` can then be computed in O(1) as `prefix[j+1] - prefix[i]`. Extend to 2D for matrix range queries. Combine with a hash map for subarray count problems.

**When to use:**

- Range sum queries
- Count subarrays with a given sum
- Problems needing cumulative data

**Common Problems:** Range Sum Query, Subarray Sum Equals K, Product of Array Except Self, Maximum Subarray, Count Subarrays

```jsx
// Build prefix array for O(1) range sum queries
const buildPrefix = (nums) => {
  const p = [0];
  for (const n of nums) p.push(p.at(-1) + n);
  return p; // range[i..j] = p[j+1] - p[i]
};

// LC 560 - Subarray Sum Equals K (prefix sum + hash map)
function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let prefix = 0,
    count = 0;
  for (const n of nums) {
    prefix += n;
    count += map.get(prefix - k) || 0;
    map.set(prefix, (map.get(prefix) || 0) + 1);
  }
  return count;
}
```

---

## Quick Reference Cheat Sheet

| Pattern             | Trigger Signal                                          |
| ------------------- | ------------------------------------------------------- |
| Two Pointers        | Sorted array, pair/target sum                           |
| Sliding Window      | Subarray/substring with constraint                      |
| Fast & Slow Pointer | Cycle detection, find middle                            |
| Binary Search       | Sorted search, minimize/maximize value                  |
| DFS                 | All paths, connected components, recursion              |
| BFS                 | Shortest path, level-by-level traversal                 |
| Dynamic Programming | Overlapping subproblems, count/min/max                  |
| Backtracking        | All combinations, permutations, constraint satisfaction |
| Heap                | Top-K, repeated min/max access                          |
| Monotonic Stack     | Next greater/smaller element                            |
| Union Find          | Dynamic grouping, cycle detection                       |
| Trie                | Prefix matching, word dictionary                        |
| Bit Manipulation    | XOR tricks, single number, bit counting                 |
| Matrix Traversal    | Grid DFS/BFS, spiral, flood fill                        |
| Greedy              | Local optimal → global optimal, intervals               |
| Prefix Sum          | Range sum queries, subarray count                       |

prefered order of learning

1. Two pointers

2. Sliding window

3. Prefix sum

4. Binary search

5. DFS

6. BFS

7. Backtracking

8. DP (last)

other good resources
https://programguru.org/
