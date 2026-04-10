// ==================== 3. FAST & SLOW POINTER ====================

/**
 * Pattern: Fast & Slow Pointer (Tortoise and Hare)
 * Used for cycle detection and finding middle in linked lists
 */

// Problem 1: Linked List Cycle
// Pattern: Fast & Slow Pointer
// Link: https://leetcode.com/problems/linked-list-cycle/
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const hasCycle = function (head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
};

// Problem 2: Linked List Cycle II
// Pattern: Fast & Slow Pointer
// Link: https://leetcode.com/problems/linked-list-cycle-ii/
const detectCycle = function (head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // Detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Find cycle start
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }

  return null;
};

// Problem 3: Happy Number
// Pattern: Fast & Slow Pointer
// Link: https://leetcode.com/problems/happy-number/
const isHappy = function (n) {
  const getNext = (num) => {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  };

  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1;
};

// Problem 4: Middle of the Linked List
// Pattern: Fast & Slow Pointer
// Link: https://leetcode.com/problems/middle-of-the-linked-list/
const middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

// Problem 5: Palindrome Linked List
// Pattern: Fast & Slow Pointer
// Link: https://leetcode.com/problems/palindrome-linked-list/
const isPalindromeLinkedList = function (head) {
  if (!head || !head.next) return true;

  // Find middle
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  let prev = null;
  let curr = slow;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Compare halves
  let left = head;
  let right = prev;

  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
};
