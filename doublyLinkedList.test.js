class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  isFirstNode(node) {
    if (!this.head) {
      this.head = node;
    }    
    if (!this.tail) {
      this.tail = node;
    }
  }

  append(value) {
    const currentNode = new Node(value);
    this.isFirstNode(currentNode);
    const previousNode = this.tail;
    previousNode.next = currentNode;

    currentNode.prev = previousNode;
    
    this.tail = currentNode;
  }

  prepend(value) {
    const node = new Node(value);
    this.isFirstNode(node);
    this.head = node;
  }

  remove(value) {
    const target = this.find(value);
    target.prev.next = target.next;
    target.next.prev = target.prev;
  }

  isEmpty() {
    return !this.tail;
  }

  find(value) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  getHead() {
    return this.head.value;
  }

  getTail() {
    return this.tail.value;
  }
}

test('append', () => {
  const list = new DoublyLinkedList();

  list.append(1);
  expect(list.getTail()).toBe(1);

  list.append(2);
  expect(list.getTail()).toBe(2);
});

test('prepend', () => {
  const list = new DoublyLinkedList();

  list.prepend(1);
  expect(list.getHead()).toBe(1);

  list.prepend(2);
  expect(list.getHead()).toBe(2);

  expect(list.getTail()).toBe(1);
});

test('isEmpty', () => {
  const list = new DoublyLinkedList();

  expect(list.isEmpty()).toBeTruthy();
  list.append(1);
  expect(list.isEmpty()).toBeFalsy();
});

test('find', () => {
  const list = new DoublyLinkedList();

  list.append(2);
  list.append(3);

  expect(list.find(2)).toBeDefined();
  expect(list.find(3)).toBeDefined();

  let node = list.find(2);
  expect(node.value).toBe(2);
  node = list.find(3);
  expect(node.value).toBe(3);
});

test('remove', () => {
  const list = new DoublyLinkedList();

  list.append(1);
  list.append(2);
  list.append(3);

  list.remove(2);
  expect(list.find(2)).toBeNull();
});

module.exports = DoublyLinkedList;
