var alienOrder = function (words) {
  const graph = new Map();
  const indegree = new Map();

  // 1️⃣ Initialize graph nodes
  for (const word of words) {
    for (const ch of word) {
      if (!graph.has(ch)) {
        graph.set(ch, new Set());
        indegree.set(ch, 0);
      }
    }
  }

  // 2️⃣ Build graph edges
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);
    let foundDiff = false;

    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!graph.get(w1[j]).has(w2[j])) {
          graph.get(w1[j]).add(w2[j]);
          indegree.set(w2[j], indegree.get(w2[j]) + 1);
        }
        foundDiff = true;
        break;
      }
    }

    // ❌ Invalid case: prefix issue
    if (!foundDiff && w1.length > w2.length) return "";
  }

  // 3️⃣ Topological sort (BFS)
  const queue = [];
  for (const [ch, deg] of indegree.entries()) {
    if (deg === 0) queue.push(ch);
  }

  let res = "";

  while (queue.length) {
    const ch = queue.shift();
    res += ch;

    for (const next of graph.get(ch)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  // 4️⃣ Detect cycle
  return res.length === indegree.size ? res : "";
};

// https://leetcode.com/problems/alien-dictionary/
// example N=5 k=4 dict=["baa","abcd","abca","cab","cad"] output=1
// example N=3 k=3 dict=["caa","aaa","aab"] output=1
