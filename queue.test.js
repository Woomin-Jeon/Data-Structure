const Stack = require('./stack.test.js');

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

class Queue {
  constructor() {
    this.enqueueStack = new Stack();
    this.dequeueStack = new Stack();
  }
  
  enqueue(node) {
      this.enqueueStack.push(node);
  }

  dequeue() {
    if (this.dequeueStack.isEmpty()) {
      this.transferValues();
    }

    return this.dequeueStack.pop();
  }

  transferValues() {
    while (!this.enqueueStack.isEmpty()) {      
      this.dequeueStack.push(this.enqueueStack.pop());
    }
  }
}

test('dequeue', () => {
  const queue = new Queue();

  queue.enqueue(new Node(1));
  queue.enqueue(new Node(2));
  queue.enqueue(new Node(3));
  queue.enqueue(new Node(4));

  expect(queue.dequeue().getValue()).toBe(1);
  expect(queue.dequeue().getValue()).toBe(2);
  expect(queue.dequeue().getValue()).toBe(3);

  queue.enqueue(new Node(5));

  expect(queue.dequeue().getValue()).toBe(4);
  expect(queue.dequeue().getValue()).toBe(5);
});
