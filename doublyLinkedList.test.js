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

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  append(node) {
    if (!this.tail) {
      this.createHeadTail(node);
      return;
    }
    
    const pastTail = this.tail;
    this.tail = node;
    
    pastTail.setNext(node);
    node.setPrev(pastTail);
  }

  prepend(node) {
    if (!this.head) {
      this.createHeadTail(node);
      return;
    }

    const pastHead = this.head;
    this.head = node;

    pastHead.setPrev(node);
    node.setNext(pastHead);
  }

  isEmpty() {
    return !this.head;
  }

  has(value) {
    let currentNode = this.head;
    while (currentNode) {      
      if (currentNode.getValue() === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  size() {
    let node = this.head;
    let count = 0;

    while(node) {
      count += 1;
      node = node.next;
    }

    return count;
  }

  remove(value) {
    const node = this.has(value);
    if (!node) {
      return null;
    }

    const prevNode = node.prev;
    const nextNode = node.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  createHeadTail(node) {
    this.head = node;
    this.tail = node;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }
}

test('append', () => {
  const list = new DoublyLinkedList();

  list.append(new Node(1));
  expect(list.getTail().getValue()).toBe(1);

  list.append(new Node(2));
  expect(list.getTail().getValue()).toBe(2);
});

test('prepend', () => {
  const list = new DoublyLinkedList();

  list.prepend(new Node(1));
  expect(list.getHead().getValue()).toBe(1);

  list.prepend(new Node(2));
  expect(list.getHead().getValue()).toBe(2);
});

test('isEmpty', () => {
  const list = new DoublyLinkedList();

  expect(list.isEmpty()).toBe(true);
  
  list.append(1);
  expect(list.isEmpty()).toBe(false);
});

test('has', () => {
  const list = new DoublyLinkedList();

  list.append(new Node(2));
  list.append(new Node(4));

  expect(list.has(2)).toBeDefined();
  expect(list.has(3)).toBeNull();
  expect(list.has(4)).toBeDefined();
});

test('size', () => {
  const list = new DoublyLinkedList();

  list.append(new Node(1));
  list.append(new Node(2));
  list.append(new Node(3));

  expect(list.size()).toBe(3);
});

test('remove', () => {
  const list = new DoublyLinkedList();

  list.append(new Node(1));
  list.append(new Node(2));
  list.append(new Node(3));

  list.remove(2);

  expect(list.has(2)).toBeNull();
  expect(list.size()).toBe(2);
});

module.exports = DoublyLinkedList;
