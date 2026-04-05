var wordBreak = function (s, wordDict) {
  let visited = new Set();
  let set = new Set(wordDict);
  let queue = [0];

  while (queue.length) {
    let current = queue.shift();

    if (!visited.has(current)) {
      for (let i = current + 1; i <= s.length; i++) {
        if (set.has(s.slice(current, i))) {
          if (i === s.length) {
            return true;
          }
          queue.push(i);
        }
      }
      visited.add(current);
    }
  }

  return false;
};

// https://leetcode.com/problems/word-break/
// example Input: s = "leetcode", wordDict = ["leet", "code"] Output: true
// example Input: s = "applepenapple", wordDict = ["apple", "pen"] Output: true
// example Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"] Output: false
