var Trie = function () {
  this.root = {};
};

Trie.prototype.insert = function (word) {
  let node = this.root;
  for (const char of word) {
    if (!node[char]) {
      node[char] = {};
    }
    node = node[char];
  }
  node.isWord = true;
};

Trie.prototype.search = function (word) {
  const node = this.find(word);
  return node != null && node.isWord === true;
};

Trie.prototype.startsWith = function (prefix) {
  return this.find(prefix) !== null;
};

Trie.prototype.find = function (word) {
  let node = this.root;
  for (const char of word) {
    node = node[char];
    if (!node) {
      return null;
    }
  }
  return node;
};

// https://leetcode.com/problems/implement-trie-prefix-tree/
// example 1
// Input
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// Output
// [null, null, true, false, true, null, true]
// Explanation
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // return True
// trie.search("app");     // return False
// trie.startsWith("app"); // return True
// trie.insert("app");
// trie.search("app");     // return True
