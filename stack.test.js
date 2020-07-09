const DoublyLinkedList = require('./doublyLinkedList.test.js');

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  setPrev(prev) {
    this.prev = prev;
  }

  setNext(next) {
    this.next = next;
  }

  getValue() {
    return this.value;
  }
}

class Stack extends DoublyLinkedList {
  constructor() {
    super();
  }

  push(node) {
    node.prev = this.tail;
    this.tail = node;
  }

  peek() {
    return this.tail;
  }

  pop() {
    const lastNode = this.tail;

    if (!lastNode) {
      return null;
    }

    this.tail = lastNode.prev;

    return lastNode;
  }
}

test('push', () => {
  const stack = new Stack();
  stack.push(new Node(1));
  stack.push(new Node(2));

  expect(stack.peek().getValue()).toBe(2);
});

test('pop', () => {
  const stack = new Stack();
  stack.push(new Node(1));
  stack.push(new Node(2));

  expect(stack.pop().getValue()).toBe(2);
  expect(stack.pop().getValue()).toBe(1);
});

test('isEmpty', () => {
  const stack = new Stack();
  expect(stack.isEmpty()).toBe(true);
});

module.exports = Stack;
 