var countSubstrings = function (s) {
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    // two pointers
    let left = i;
    let right = i;
    // odd
    helper(left, right);
    // even
    helper(left, right + 1);
  }

  function helper(left, right) {
    while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  }

  return count;
};

// https://leetcode.com/problems/palindromic-substrings/
console.log(countSubstrings("abc"));
// 3 ["a", "b", "c"]
console.log(countSubstrings("aaa"));
// 6 ["a", "a", "a", "aa", "aa", "aaa"]
