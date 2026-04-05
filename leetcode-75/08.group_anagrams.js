var groupAnagrams = function (strs) {
  const sorted = strs.map((str) => str.split("").sort().join(""));
  const map = {};

  for (let i = 0; i < sorted.length; i++) {
    if (!map[sorted[i]]) {
      map[sorted[i]] = [strs[i]];
    } else {
      map[sorted[i]].push(strs[i]);
    }
  }

  return Object.values(map);
};

// https://leetcode.com/problems/group-anagrams/
// example Input: strs = ["eat","tea","tan","ate","nat","bat"] Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// example Input: strs = [""] Output: [[""]]
// example Input: strs = ["a"] Output: [["a"]]
