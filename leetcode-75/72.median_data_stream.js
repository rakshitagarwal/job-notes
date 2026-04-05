var MedianFinder = function () {
  this.arr = [];
};

MedianFinder.prototype.addNum = function (num) {
  let left = 0;
  let right = this.arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((right + left) / 2);
    if (this.arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  this.arr.splice(left, 0, num);
};

MedianFinder.prototype.findMedian = function () {
  if (this.arr.length % 2 === 0) {
    let mid = this.arr.length / 2;
    return (this.arr[mid] + this.arr[mid - 1]) / 2;
  } else {
    let mid = Math.floor(this.arr.length / 2);
    return this.arr[mid];
  }
};

// https://leetcode.com/problems/find-median-from-data-stream
// example Input: ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
// [[],[1],[2],[],[3],[]]
// Output: [null,null,null,1.5,null,2.0]

// explanation:
// MedianFinder medianFinder = new MedianFinder();
// medianFinder.addNum(1);    // arr = [1]
// medianFinder.addNum(2);    // arr = [1, 2]
// medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
// medianFinder.addNum(3);    // arr[1, 2, 3]
// medianFinder.findMedian(); // return 2.0
