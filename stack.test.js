const DoublyLinkedList = require('./doublyLinkedList.test.js');

class Stack extends DoublyLinkedList {
  constructor() {
    super();
  }
  
  peek() {
    return this.tail.value;
  }

  push(value) {
    this.append(value);
  }

  pop() {
    this.head.prev = null;
    const value = this.tail.value;

    if(this.tail.prev) {
      this.tail = this.tail.prev;
    } else {
      this.tail = null;
      this.head = null;
    }

    if (this.tail) {
      this.tail.next = null;
    }
    return value;
  }

  isEmptyValue() {
    return !this.tail.value
  }
}

test('push', () => {
  const stack = new Stack();
  stack.push(1);
  stack.push(2);

  expect(stack.peek()).toBe(2);
});

test('pop', () => {
  const stack = new Stack();
  stack.push(1);

  expect(stack.pop()).toBe(1);
});

test('isEmpty', () => {
  const stack = new Stack();
  expect(stack.isEmpty()).toBe(true);
})


test('isEmptyValue', () => {
  const stack = new Stack();
  expect(stack.isEmpty()).toBe(true);
})

module.exports = Stack;
 