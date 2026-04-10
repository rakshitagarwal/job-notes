// ==================== 9. HEAP (Priority Queue) ====================

/**
 * Pattern: Heap
 * Used for top-k and priority-based problems
 * Note: JavaScript doesn't have built-in heap, implementing MinHeap/MaxHeap
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  sinkDown(index) {
    const length = this.heap.length;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let swap = null;
      let element = this.heap[index];

      if (leftChild < length && this.heap[leftChild] < element) {
        swap = leftChild;
      }

      if (rightChild < length) {
        if (
          (swap === null && this.heap[rightChild] < element) ||
          (swap !== null && this.heap[rightChild] < this.heap[leftChild])
        ) {
          swap = rightChild;
        }
      }

      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }

  size() {
    return this.heap.length;
  }
}

// Problem 1: Kth Largest Element in an Array
// Pattern: Heap
// Link: https://leetcode.com/problems/kth-largest-element-in-an-array/
const findKthLargest = function (nums, k) {
  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }

  return minHeap.pop();
};

// Problem 2: Top K Frequent Elements
// Pattern: Bucket Sort
// Link: https://leetcode.com/problems/top-k-frequent-elements/
const topKFrequent = function (nums, k) {
  const frequency = new Map();
  for (const num of nums) {
    frequency.set(num, (frequency.get(num) || 0) + 1);
  }

  const buckets = Array(nums.length + 1)
    .fill()
    .map(() => []);

  for (const [num, freq] of frequency) {
    buckets[freq].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length) {
      result.push(...buckets[i]);
    }
  }

  return result.slice(0, k);
};

// Problem 3: Merge K Sorted Lists
// Pattern: Merge Sort
// Link: https://leetcode.com/problems/merge-k-sorted-lists/
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const mergeKLists = function (lists) {
  const minHeap = new MinHeap();

  // Add first node of each list
  for (const list of lists) {
    if (list) {
      minHeap.push({ val: list.val, node: list });
    }
  }

  const dummy = new ListNode(0);
  let current = dummy;

  while (minHeap.size()) {
    const { val, node } = minHeap.pop();
    current.next = node;
    current = current.next;

    if (node.next) {
      minHeap.push({ val: node.next.val, node: node.next });
    }
  }

  return dummy.next;
};

// Problem 4: Find Median from Data Stream
// Pattern: Heap
// Link: https://leetcode.com/problems/find-median-from-data-stream/
class MedianFinder {
  constructor() {
    this.maxHeap = []; // For smaller half
    this.minHeap = []; // For larger half
  }

  addNum(num) {
    // Add to maxHeap
    this.maxHeap.push(num);
    this.maxHeap.sort((a, b) => b - a);

    // Move largest from maxHeap to minHeap
    this.minHeap.push(this.maxHeap.pop());
    this.minHeap.sort((a, b) => a - b);

    // Balance heaps
    if (this.minHeap.length > this.maxHeap.length) {
      this.maxHeap.push(this.minHeap.pop());
      this.maxHeap.sort((a, b) => b - a);
      this.minHeap.sort((a, b) => a - b);
    }
  }

  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      return this.maxHeap[0];
    }
    return (this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}

// Problem 5: Task Scheduler
// Pattern: Heap
// Link: https://leetcode.com/problems/task-scheduler/
const leastInterval = function (tasks, n) {
  const frequency = new Array(26).fill(0);
  for (const task of tasks) {
    frequency[task.charCodeAt(0) - 65]++;
  }

  frequency.sort((a, b) => b - a);
  const maxFreq = frequency[0];
  let idleTime = (maxFreq - 1) * n;

  for (let i = 1; i < frequency.length; i++) {
    idleTime -= Math.min(maxFreq - 1, frequency[i]);
  }

  return tasks.length + Math.max(0, idleTime);
};
