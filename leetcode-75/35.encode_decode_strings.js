var encode = function (strs) {
  if (!strs.length) return null;
  return strs.join("-encodeStr");
};

var decode = function (s) {
  if (s === null) return [];
  return s.split("-encodeStr");
};

// https://leetcode.com/problems/encode-and-decode-strings/
// const strs = ["hello", "world"];
// const enc = encode(strs);
// const dec = decode(enc);
