var reverseList = function (head) {
  let prev = null;

  while (head) {
    let nextNode = head.next; // Store next node
    head.next = prev; // Reverse pointer
    prev = head; // Move prev forward
    head = nextNode; // Move head forward
  }

  return prev;
};

// https://leetcode.com/problems/reverse-linked-list/
// input: head = [1,2,3,4,5]
// output: [5,4,3,2,1]
