var longestPalindrome = function (s) {
  let longest = "";

  function isPal(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }

    return s.slice(left + 1, right);
  }

  for (let i = 0; i < s.length; i++) {
    const oddPal = isPal(s, i, i);
    const evenPal = isPal(s, i, i + 1);
    const longerPal = oddPal.length > evenPal.length ? oddPal : evenPal;

    if (longerPal.length > longest.length) {
      longest = longerPal;
    }
  }

  return longest;
};

// https://leetcode.com/problems/longest-palindromic-substring/
//  s = "babad" output = "bab"
//  s = "cbbd" output = "bb"
