class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        if (this.isEmpty()) {
            this.value = value;
            return;
        }

        if (value > this.value) {
            if (!this.right) {
                this.right = new Node();
                this.right.parent = this;
            }

            this.right.insert(value);
        } else {
            if (!this.left) {
                this.left = new Node();
                this.left.parent = this;
            }

            this.left.insert(value);
        }
    }

    getValue() {
        return this.value;
    }

    getHeight() {
        if (this.isEmpty()) {
            return 0;
        }

        let leftHeight = this.left ? this.left.getHeight() : 0;
        let rightHeight = this.right ? this.right.getHeight() : 0;

        return 1 + Math.max(leftHeight, rightHeight);
    }

    isEmpty() {
        return !this.value;
    }

    hasNoChild() {
        return !this.left && !this.right;
    }

    removeChild(target) {        
        if (target === this.left) {
            this.left = null;
            return;
        }
        this.right = null;
    }
}

class BinarySearchTree {

    constructor() {
        this.root = null;
        this.height = 0;
    }

    insert(value) {
        if (this.isEmpty()) {
            this.root = new Node();
        }

        this.root.insert(value);
    }

    getHeight() {
        if(this.root == null) {
            return 0;
        }

        return this.root.getHeight();
    }

    isEmpty() {
        return !this.root;
    }

    getValue(node) {
        return node.value;
    }

    findMax(root = this.root) {
        let currentNode = root;

        while (true) {
            if (!currentNode.right) {
                return currentNode;
            }
            currentNode = currentNode.right;
        }
    }

    findNodeByValue(value) {
        let currentNode = this.root;

        while (true) {
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }

            if (value === currentNode.value) {
                return currentNode;
            }
        }
    }

    remove(value) {
        const target = this.findNodeByValue(value);
        const { parent, left, right } = target;

        if (target.hasNoChild()) {
            parent.removeChild(target);
            return;
        } 

        const replacedNode = this.findMax(target.left);

        replacedNode.parent = parent;
        replacedNode.left = left;
        replacedNode.right = right;
    }
}

describe('binarySearchTree', () => {
    describe('remove', () => {
        let bst;

        describe('when height 3 tree is given', () => {
            beforeEach(() => {
                bst = new BinarySearchTree();
                bst.insert(5);
                bst.insert(3);
                bst.insert(7);
                bst.insert(4);
            });
            
            it('makse tree height 2', () => {
                bst.remove(4);
                expect(bst.getHeight()).toBe(2);
            });
        });

        describe('when middle node is target', () => {
            beforeEach(() => {
                bst = new BinarySearchTree();
                bst.insert(10);
                bst.insert(5);
                bst.insert(15);
                bst.insert(3);
                bst.insert(7);
                bst.insert(2);
                bst.insert(4);
                bst.insert(6);
                bst.insert(9);
            });

            it('connects nodes in tree except target node', () => {
                bst.remove(5);

                expect(bst.getValue(bst.findNodeByValue(4).parent)).toBe(bst.findNodeByValue(10).value);
                expect(bst.getValue(bst.findNodeByValue(4).left)).toBe(bst.findNodeByValue(3).value);
                expect(bst.getValue(bst.findNodeByValue(5).right)).toBe(bst.findNodeByValue(7).value);
            });
        })
    });

    describe('findNodeByValue', () => {
        let bst;

        beforeEach(() => {
            bst = new BinarySearchTree();
            bst.insert(5);
            bst.insert(3);
            bst.insert(7);
            bst.insert(4);
            bst.insert(2);
        });

        it('returns node that matches to value', () => {
            expect(bst.findNodeByValue(5).value).toBe(5);
            expect(bst.findNodeByValue(3).value).toBe(3);
            expect(bst.findNodeByValue(7).value).toBe(7);
            expect(bst.findNodeByValue(4).value).toBe(4);
            expect(bst.findNodeByValue(2).value).toBe(2);
        });

    });

    describe('insert', () => {
        let bst;

        beforeEach(() => {
            bst = new BinarySearchTree();
        });

        describe('with one insertion', () => {
            beforeEach(() => {
                bst.insert(5);
            });

            it('makes tree height 1', () => {
                expect(bst.getHeight()).toBe(1);
            });
        });

        describe('with two insertion (one is left child)', () => {
            beforeEach(() => {
                bst.insert(5);
                bst.insert(3);
            });

            it('makes tree height 2', () => {
                expect(bst.getHeight()).toBe(2);
            });
        });

        describe('with three insertion (two is left and right child)', () => {
            beforeEach(() => {
                bst.insert(5);
                bst.insert(3);
                bst.insert(7);
            });

            it('makes tree height 2', () => {
                expect(bst.getHeight()).toBe(2);
            });
        });
    });

    describe('getHeight', () => {
        let bst;

        beforeEach(() => {
            bst = new BinarySearchTree();
        });

        describe('without node in binarySearchTree', () => {    
            it('returns 0', () => {
                expect(bst.getHeight()).toBe(0);
            });
        });

        describe('with one node in binarySearchTree', () => {
            beforeEach(() => {
                bst.insert(5);
            });

            it('returns 1', () => {    
                expect(bst.getHeight()).toBe(1);
            });
        });

        describe('with only left child exist', () => {
            beforeEach(() => {
                bst.insert(5);
                bst.insert(3);
            });

            it('returns 2', () => {
                expect(bst.getHeight()).toBe(2);
            });
        });

        describe('with only right child exist', () => {
            beforeEach(() => {
                bst.insert(5);
                bst.insert(8);
            });

            it('returns 2', () => {
                expect(bst.getHeight()).toBe(2);
            });
        });

        describe('with both child exist', () => {
            beforeEach(() => {
                bst.insert(5);
                bst.insert(3);
                bst.insert(8);
            });

            it('returns 2', () => {
                expect(bst.getHeight()).toBe(2);
            });
        });

        describe('with root node\'s child has child', () => {
            beforeEach(() => {
                bst.insert(5);
                bst.insert(3);
                bst.insert(8);
                bst.insert(4);
            });

            it('returns 3', () => {
                expect(bst.getHeight()).toBe(3);
            });
        });
    });

    describe('isEmpty', () => {
        let bst;

        beforeEach(() =>{
            bst = new BinarySearchTree();
        });

        describe('when tree is empty', () => {
            it('returns true', () =>{
                 expect(bst.isEmpty()).toBe(true);
            })
        })

        describe('when root has node', () => {
            beforeEach(() =>{
                bst.insert(1);
            })

            it('returns false', () =>{
                expect(bst.isEmpty()).toBe(false);
            })
        })
    });

    describe('findMax', () => {
        let bst = new BinarySearchTree();

        beforeEach(() => {
            bst.insert(6);
            bst.insert(7);
            bst.insert(4);
            bst.insert(3);
            bst.insert(1);
            bst.insert(2);
            bst.insert(5);
        });

        it('returns largest node of the child', () => {
            expect(bst.findMax().getValue()).toBe(7);
        });
    });

    describe('getValue', () => {
        let bst;

        beforeEach(() => {
            bst = new BinarySearchTree();
            bst.insert(5);
        });

        it('returns node\'s value', () => {
            expect(bst.getValue(bst.root)).toBe(5);
        });
    });
});