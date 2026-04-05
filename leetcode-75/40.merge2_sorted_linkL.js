var mergeTwoLists = function (l1, l2) {
  if (!l1 || !l2) return l1 || l2;
  if (l1.val > l2.val) [l2, l1] = [l1, l2];
  l1.next = mergeTwoLists(l1.next, l2);
  return l1;
};

// video sol
var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode(0);
  let head = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      dummy.next = list1;
      list1 = list1.next;
    } else {
      dummy.next = list2;
      list2 = list2.next;
    }
    dummy = dummy.next;
  }

  if (list1 !== null) {
    dummy.next = list1;
  } else {
    dummy.next = list2;
  }

  return head.next;
};

// https://leetcode.com/problems/merge-two-sorted-lists/
// example Input: list1 = [1,2,4], list2 = [1,3,4] Output: [1,1,2,3,4,4]
