// ==================== 7. HEAP ====================

/**
 * Notes: https://www.hellointerview.com/learn/code/heap/overview
 * Time Complexity: O(log n) | Space Complexity: O(1)
 */

// Problem 1: Kth Largest Element in an Array
// Pattern: Heap
// Link: https://leetcode.com/problems/kth-largest-element-in-an-array/
function heapInsert(heap, val) {
  heap.push(val);
  let i = heap.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (heap[p] <= heap[i]) break;
    [heap[p], heap[i]] = [heap[i], heap[p]];
    i = p;
  }
}
function heapReplace(heap, val) {
  if (heap.length && heap[0] < val) {
    heap[0] = val;
    let i = 0;
    while (2 * i + 1 < heap.length) {
      let j = 2 * i + 1;
      if (j + 1 < heap.length && heap[j + 1] < heap[j]) j++;
      if (heap[i] <= heap[j]) break;
      [heap[i], heap[j]] = [heap[j], heap[i]];
      i = j;
    }
  }
}
function findKthLargest(nums, k) {
  if (nums.length === 0) {
    return null;
  }
  const heap = [];
  for (const num of nums) {
    if (heap.length < k) {
      heapInsert(heap, num);
    } else if (num > heap[0]) {
      heapReplace(heap, num);
    }
  }
  return heap[0];
}

// Problem 2: K Closest Points to Origin
// Pattern: Heap
// Link: https://leetcode.com/problems/k-closest-points-to-origin/
var kClosest = function (points, k) {
  const heap = [];
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    const distance = x * x + y * y;

    if (heap.length < k) {
      heapPush(heap, [distance, i]);
    } else if (distance < heap[0][0]) {
      heapPop(heap);
      heapPush(heap, [distance, i]);
    }
  }

  return heap.map((p) => points[p[1]]);
};

// -------- MAX HEAP FUNCTIONS --------

// Push into heap
function heapPush(heap, val) {
  heap.push(val);
  bubbleUp(heap);
}

// Pop max (root)
function heapPop(heap) {
  const last = heap.pop();
  if (heap.length === 0) return;

  heap[0] = last;
  bubbleDown(heap);
}

// Maintain heap upwards
function bubbleUp(heap) {
  let i = heap.length - 1;

  while (i > 0) {
    let parent = Math.floor((i - 1) / 2);

    if (heap[parent][0] >= heap[i][0]) break;

    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;
  }
}

// Maintain heap downwards
function bubbleDown(heap) {
  let i = 0;
  const n = heap.length;

  while (true) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;

    if (left < n && heap[left][0] > heap[largest][0]) {
      largest = left;
    }

    if (right < n && heap[right][0] > heap[largest][0]) {
      largest = right;
    }

    if (largest === i) break;

    [heap[i], heap[largest]] = [heap[largest], heap[i]];
    i = largest;
  }
}

// Problem 3: Find K Closest Elements
// Pattern: Heap
// Link: https://leetcode.com/problems/find-k-closest-elements/
function findClosestElements(nums, k, target) {
  let left = 0;
  let right = nums.length - k;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (target - nums[mid] > nums[mid + k] - target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums.slice(left, left + k);
}

// Problem 4: Merge K Sorted Lists
// Link: https://leetcode.com/problems/merge-k-sorted-lists/
var mergeKLists = function (lists) {
  if (!lists || lists.length === 0) return null;

  const heap = [];

  // Push all non-null heads
  for (let node of lists) {
    if (node) heapPush(heap, node);
  }

  const dummy = new ListNode(0);
  let curr = dummy;

  while (heap.length > 0) {
    const node = heapPop(heap); // smallest node

    curr.next = node;
    curr = curr.next;

    if (node.next) {
      heapPush(heap, node.next);
    }
  }

  return dummy.next;
};

// -------- MIN HEAP --------

// Push
function heapPush(heap, node) {
  heap.push(node);
  bubbleUp(heap);
}

// Pop smallest
function heapPop(heap) {
  const top = heap[0];
  const last = heap.pop();

  if (heap.length > 0) {
    heap[0] = last;
    bubbleDown(heap);
  }

  return top;
}

// Heapify up
function bubbleUp(heap) {
  let i = heap.length - 1;

  while (i > 0) {
    let parent = Math.floor((i - 1) / 2);

    if (heap[parent].val <= heap[i].val) break;

    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;
  }
}

// Heapify down
function bubbleDown(heap) {
  let i = 0;
  const n = heap.length;

  while (true) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let smallest = i;

    if (left < n && heap[left].val < heap[smallest].val) {
      smallest = left;
    }

    if (right < n && heap[right].val < heap[smallest].val) {
      smallest = right;
    }

    if (smallest === i) break;

    [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
    i = smallest;
  }
}

// Problem 5: Find Median from Data Stream
// Pattern: Heap
// Link: https://leetcode.com/problems/find-median-from-data-stream/

/*************** GENERIC HEAP ***************/
class MyHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare; // comparator
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(val) {
    this.data.push(val);
    this.bubbleUp();
  }

  pop() {
    const top = this.peek();
    const last = this.data.pop();

    if (this.size() > 0) {
      this.data[0] = last;
      this.bubbleDown();
    }

    return top;
  }

  bubbleUp() {
    let i = this.size() - 1;

    while (i > 0) {
      let p = Math.floor((i - 1) / 2);

      if (this.compare(this.data[p], this.data[i])) break;

      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  bubbleDown() {
    let i = 0;
    const n = this.size();

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let best = i;

      if (left < n && !this.compare(this.data[best], this.data[left])) {
        best = left;
      }

      if (right < n && !this.compare(this.data[best], this.data[right])) {
        best = right;
      }

      if (best === i) break;

      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
}

var MedianFinder = function () {
  // maxHeap → larger value has priority
  this.maxHeap = new MyHeap((a, b) => a > b);

  // minHeap → smaller value has priority
  this.minHeap = new MyHeap((a, b) => a < b);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  // Step 1: push to maxHeap
  this.maxHeap.push(num);

  // Step 2: balance order (maxHeap top should be <= minHeap top)
  this.minHeap.push(this.maxHeap.pop());

  // Step 3: balance size
  if (this.minHeap.size() > this.maxHeap.size()) {
    this.maxHeap.push(this.minHeap.pop());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.maxHeap.size() > this.minHeap.size()) {
    return this.maxHeap.peek();
  }

  return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
};
