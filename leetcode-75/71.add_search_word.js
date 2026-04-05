var WordDictionary = function () {
  this.root = {};
};

WordDictionary.prototype.addWord = function (word) {
  let node = this.root;

  for (const character of word) {
    node[character] = node[character] || {};
    node = node[character];
  }

  node.isTail = true;
};

WordDictionary.prototype.search = function (word) {
  return dfs(this.root, 0);

  function dfs(node, i) {
    if (word.length === i) {
      return node.isTail;
    }
    if (word[i] === ".") {
      for (const key in node) {
        if (dfs(node[key], i + 1)) {
          return true;
        }
      }
    } else if (node[word[i]] && dfs(node[word[i]], i + 1)) {
      return true;
    }

    return false;
  }
};

// https://leetcode.com/problems/design-add-and-search-words-data-structure/
// example Input: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
// [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
// Output: [null,null,null,null,false,true,true,true]
