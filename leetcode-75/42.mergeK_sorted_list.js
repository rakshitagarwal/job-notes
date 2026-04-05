var mergeKLists = function (lists) {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  while (lists.length > 1) {
    let list1 = lists.shift();
    let list2 = lists.shift();
    let merged = mergeLists(list1, list2);
    lists.push(merged);
  }
  return lists[0];
};

var mergeLists = function (list1, list2) {
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

  if (list1 === null) {
    dummy.next = list2;
  } else {
    dummy.next = list1;
  }

  return head.next;
};

// https://leetcode.com/problems/merge-k-sorted-lists/
// example Input: lists = [[1,4,5],[1,3,4],[2,6]] Output: [1,1,2,3,4,4,5,6]
