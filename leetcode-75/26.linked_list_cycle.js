/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var hasCycle = function (head) {
  if (!head) return false;
  // Initialize slow and fast pointers
  let fast = head;
  let slow = head;

  while (fast) {
    if (!fast.next) {
      return false;
    } else {
      fast = fast.next.next; // move fast by 2
      slow = slow.next; // move slow by 1
    }

    if (fast === slow) {
      // Cycle detected
      return true;
    }
  }

  // No cycle
  return false;
};

// https://leetcode.com/problems/linked-list-cycle/
// input: head = [3,2,0,-4], pos = 1
// output: true

// input: head = [1,2], pos = 0
// output: true
