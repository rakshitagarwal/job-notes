// ==================== 5. LINKED LIST ====================

/**
 * Pattern: Linked List
 * Notes: https://www.hellointerview.com/learn/code/linked-list/overview
 * Time Complexity: O(n) | Space Complexity: O(1)
 */

// Problem 1 : Linked List Cycle
// Link: https://leetcode.com/problems/linked-list-cycle/
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

// Problem 2 : Palindrome Linked List
// Link: https://leetcode.com/problems/palindrome-linked-list/
function isPalindrome(head) {
  if (!head || !head.next) {
    return true;
  }

  // find middle node
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // reverse second half
  let prev = null;
  while (slow) {
    let next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  // compare halves
  let first = head,
    second = prev;
  while (second) {
    if (first.val !== second.val) {
      return false;
    }
    first = first.next;
    second = second.next;
  }

  return true;
}

// Problem 3 : Remove Nth Node From End of List
// Link: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
function removeNthFromEnd(head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy,
    slow = dummy;
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  // remove nth node from end
  slow.next = slow.next.next;
  return dummy.next;
}

// Problem 4 : Reorder List
// Link: https://leetcode.com/problems/reorder-list/
function reorderList(head) {
  if (!head || !head.next) {
    return head;
  }

  // find middle node
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // reverse second half of list
  let prev = null,
    curr = slow;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // merge first and reversed second half of list
  let first = head,
    second = prev;
  while (second.next) {
    let temp = first.next;
    first.next = second;
    first = temp;
    temp = second.next;
    second.next = first;
    second = temp;
  }

  return head;
}

// Problem 5 : Swap Nodes in Pairs
// Link: https://leetcode.com/problems/swap-nodes-in-pairs/
function swapPairs(head) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let tail = dummy,
    first = head;

  while (first && first.next) {
    let second = first.next;

    // swap nodes
    tail.next = second;
    first.next = second.next;
    second.next = first;

    tail = first;
    first = first.next;
  }

  return dummy.next;
}
