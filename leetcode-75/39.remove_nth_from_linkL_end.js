var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let left = dummy;
  let right = head;

  while (right && n > 0) {
    right = right.next;
    n -= 1;
  }

  while (right) {
    left = left.next;
    right = right.next;
  }

  left.next = left.next.next;
  return dummy.next;
};

// https://leetcode.com/problems/remove-nth-node-from-end-of-list/
// example Input: head = [1,2,3,4,5], n = 2 Output: [1,2,3,5]
