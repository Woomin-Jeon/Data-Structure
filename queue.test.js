const Stack = require('./stack.test.js');

class Queue {
  constructor() {
    this.enqueueStack = new Stack();
    this.dequeueStack = new Stack();
  }
  
  enqueue(value) {
      this.enqueueStack.push(value);
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

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  queue.enqueue(4);

  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);
  expect(queue.dequeue()).toBe(3);

  queue.enqueue(5);

  expect(queue.dequeue()).toBe(4);
  expect(queue.dequeue()).toBe(5);
});
