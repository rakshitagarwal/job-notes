var isPalindrome = function (s) {
  const string = s.replace(/[^A-Z\d]+/gi, "").toLowerCase();
  return string.split("").reverse().join("") === string;
};

var isPalindrome = function (s) {
  const string = clearUp(s);
  return isPal(string);
};

function clearUp(s) {
  let char = "abcdefghijklmnopqrstuvwxyz0123456789";
  let newS = "";
  for (let i = 0; i < s.length; i++) {
    let lCase = s[i].toLowerCase();
    if (char.indexOf(lCase) !== -1) {
      newS += lCase;
    }
  }
  return newS;
}

function isPal(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

// https://leetcode.com/problems/valid-palindrome/
// example Input: s = "A man, a plan, a canal: Panama" Output: true
// example Input: s = "race a car" Output: false
