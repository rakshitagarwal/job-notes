// ==================== 11. UNION FIND (Disjoint Set Union) ====================

/**
 * Pattern: Union Find
 * Used to find connected components efficiently
 */

class UnionFind {
  constructor(n) {
    this.parent = Array(n)
      .fill()
      .map((_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }
}

// Problem 1: Number of Islands (Union Find version)
// Pattern: Union Find
// Link: https://leetcode.com/problems/number-of-islands/
const numIslandsUnionFind = function (grid) {
  if (!grid.length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const uf = new UnionFind(rows * cols);
  let waterCount = 0;

  const getIndex = (i, j) => i * cols + j;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        // Check right and down neighbors
        if (i + 1 < rows && grid[i + 1][j] === "1") {
          uf.union(getIndex(i, j), getIndex(i + 1, j));
        }
        if (j + 1 < cols && grid[i][j + 1] === "1") {
          uf.union(getIndex(i, j), getIndex(i, j + 1));
        }
      } else {
        waterCount++;
      }
    }
  }

  const roots = new Set();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        roots.add(uf.find(getIndex(i, j)));
      }
    }
  }

  return roots.size;
};

// Problem 2: Redundant Connection
// Pattern: Union Find
// Link: https://leetcode.com/problems/redundant-connection/
const findRedundantConnection = function (edges) {
  const n = edges.length;
  const uf = new UnionFind(n + 1);

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) {
      return [u, v];
    }
  }

  return [];
};

// Problem 3: Accounts Merge
// Pattern: Union Find
// Link: https://leetcode.com/problems/accounts-merge/
const accountsMerge = function (accounts) {
  const emailToName = new Map();
  const emailToId = new Map();
  let id = 0;

  // Assign IDs to emails
  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      if (!emailToId.has(email)) {
        emailToId.set(email, id++);
        emailToName.set(email, name);
      }
    }
  }

  const uf = new UnionFind(id);

  // Union emails in same account
  for (const [_, ...emails] of accounts) {
    const firstEmail = emails[0];
    const firstId = emailToId.get(firstEmail);

    for (let i = 1; i < emails.length; i++) {
      const currentId = emailToId.get(emails[i]);
      uf.union(firstId, currentId);
    }
  }

  // Group emails by root
  const groups = new Map();
  for (const [email, emailId] of emailToId) {
    const root = uf.find(emailId);
    if (!groups.has(root)) {
      groups.set(root, []);
    }
    groups.get(root).push(email);
  }

  // Format result
  const result = [];
  for (const [root, emails] of groups) {
    const name = emailToName.get(emails[0]);
    emails.sort();
    result.push([name, ...emails]);
  }

  return result;
};

// Problem 4: Friend Circles (Number of Provinces)
// Pattern: Union Find
// Link: https://leetcode.com/problems/friend-circles/
const findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const uf = new UnionFind(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1) {
        uf.union(i, j);
      }
    }
  }

  const provinces = new Set();
  for (let i = 0; i < n; i++) {
    provinces.add(uf.find(i));
  }

  return provinces.size;
};

// Problem 5: Satisfiability of Equality Equations
// Pattern: Union Find
// Link: https://leetcode.com/problems/satisfiability-of-equality-equations/
var equationsPossible = function (equations) {
  const parent = Array(26)
    .fill(0)
    .map((_, i) => i);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // path compression
    }
    return parent[x];
  }

  function union(x, y) {
    parent[find(x)] = find(y);
  }

  // Step 1: union equal equations
  for (let eq of equations) {
    if (eq[1] === "=") {
      let a = eq.charCodeAt(0) - 97;
      let b = eq.charCodeAt(3) - 97;
      union(a, b);
    }
  }

  // Step 2: check inequality
  for (let eq of equations) {
    if (eq[1] === "!") {
      let a = eq.charCodeAt(0) - 97;
      let b = eq.charCodeAt(3) - 97;

      if (find(a) === find(b)) return false;
    }
  }

  return true;
};
