// ==================== 12. TRIE (Prefix Tree) ====================

/**
 * Pattern: Trie
 * Used for prefix-based searching
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char);
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char);
    }
    return true;
  }
}

// Problem 1: Implement Trie (Prefix Tree)
// Already implemented above

// Problem 2: Word Search II
// Pattern: Trie
// Link: https://leetcode.com/problems/word-search-ii/
const findWords = function (board, words) {
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  const result = new Set();
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (i, j, node, word) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] === "#") return;

    const char = board[i][j];
    if (!node.children.has(char)) return;

    const nextNode = node.children.get(char);
    word += char;

    if (nextNode.isEnd) {
      result.add(word);
    }

    board[i][j] = "#"; // Mark as visited

    dfs(i + 1, j, nextNode, word);
    dfs(i - 1, j, nextNode, word);
    dfs(i, j + 1, nextNode, word);
    dfs(i, j - 1, nextNode, word);

    board[i][j] = char; // Backtrack
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dfs(i, j, trie.root, "");
    }
  }

  return Array.from(result);
};

// Problem 3: Replace Words
// Pattern: Trie
// Link: https://leetcode.com/problems/replace-words/
const replaceWords = function (dictionary, sentence) {
  const trie = new Trie();
  for (const word of dictionary) {
    trie.insert(word);
  }

  const words = sentence.split(" ");
  const result = [];

  for (const word of words) {
    let prefix = "";
    let node = trie.root;

    for (const char of word) {
      if (!node.children.has(char)) break;
      prefix += char;
      node = node.children.get(char);
      if (node.isEnd) break;
    }

    result.push(node.isEnd ? prefix : word);
  }

  return result.join(" ");
};

// Problem 4: Add and Search Word - Data structure design
// Pattern: Trie
// Link: https://leetcode.com/problems/add-and-search-word-data-structure-design/
class WordDictionary {
  constructor() {
    this.trie = new Trie();
  }

  addWord(word) {
    this.trie.insert(word);
  }

  search(word) {
    const dfs = (node, index) => {
      if (index === word.length) {
        return node.isEnd;
      }

      const char = word[index];

      if (char === ".") {
        for (const child of node.children.values()) {
          if (dfs(child, index + 1)) return true;
        }
        return false;
      } else {
        if (!node.children.has(char)) return false;
        return dfs(node.children.get(char), index + 1);
      }
    };

    return dfs(this.trie.root, 0);
  }
}

// Problem 5: Longest Word in Dictionary
// Pattern: Trie
// Link: https://leetcode.com/problems/longest-word-in-dictionary/
const longestWord = function (words) {
  const trie = new Trie();
  words.sort();

  let longest = "";

  for (const word of words) {
    if (word.length === 1 || trie.search(word.slice(0, -1))) {
      trie.insert(word);
      if (word.length > longest.length) {
        longest = word;
      }
    }
  }

  return longest;
};
