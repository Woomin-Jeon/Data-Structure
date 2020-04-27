class MySet {
    constructor(...values) {
        this.values = [];
        values.forEach(value => {
            this.add(value);
        });
    }

    getValues() {
        return this.values;
    }

    include(value) {
        return this.values.includes(value);
    }

    add(value) {
        if  (!this.include(value)) {
            this.values.push(value);
        }
    }

    size() {
        return this.values.length;
    }

    delete(value) {
        const index = this.values.indexOf(value);
        if  (index === -1) {
            return;
        }
        this.values.splice(index,1);
    }

    isEqual(set) {
        return this.values.every(v => set.include(v));
    }

    isSubsetOf(set) {
        if (this.size() === 0) {
          return true;
        }

        if (set.size() === 0) {
          return false;
        }

        if (this.size() > set.size()) {
          return false;
        }

        return this.values.every(v => set.include(v));
    }

    intersection(set) {
        const intersection = [];

        set.values.forEach(v => {
            if (this.include(v)) {
                intersection.push(v);
            }
        });
            
        return intersection;
    }

    union(set) {
        const union = [];

        this.values.forEach(v => union.push(v));
        set.values.forEach(v => {
            if (!union.includes(v)) {
                union.push(v);
            }
        })

        return union;
    }

    diferenceOf(set) {
      const intersection = this.intersection(set);
      const setArr = set.values.slice();

      intersection.forEach(v => {
          const index = setArr.indexOf(v);
          setArr.splice(index, 1);
      });
          
      return setArr;
    }
}

describe('set', () => {
    test('make Set', () => {
        
        const set = new MySet(1,2,3,4,5);
        expect(set.getValues()).toEqual([1,2,3,4,5]);

        const set1 = new MySet(1,2,3,4,5,2,2,2);
        expect(set1.getValues()).toEqual([1,2,3,4,5]);
    });

    test('add', () => {
        const set = new MySet();

        set.add(1);
        expect(set.include(1)).toBeTruthy();

        set.add(1);
        expect(set.include(1)).toBeTruthy();
        expect(set.size()).toBe(1);
    })

    test('size', () => {
        const set = new MySet();

        set.add(1);
        set.add(1);
        expect(set.size()).toBe(1);
    });

    test('delete', () => {
        const set = new MySet(1,2,3,4,5,2,2,2);
        set.delete(1);

        expect(set.size()).toBe(4);
        set.delete(2);
        expect(set.size()).toBe(3);
        
        expect(set.include(1)).toBeFalsy();
        expect(set.include(2)).toBeFalsy();
    });

    test('is same set', () => {
        const set1 = new MySet();
        const set2 = new MySet();

        expect(set1.isEqual(set2)).toBeTruthy();
        
        set1.add(3);
        expect(set2.isEqual(set1)).toBeTruthy();

        set2.add(2);
        expect(set1.isEqual(set2)).toBeFalsy();

        set1.add(2);
        set2.add(3);
        expect(set1.isEqual(set2)).toBeTruthy();
    });

    test('is Subset', () => {
        const set1 = new MySet();
        const set2 = new MySet();

        set1.add(3);
        set2.add(3, 4);
        expect(set1.isSubsetOf(set2)).toBeTruthy();

        set2.delete(3);
        expect(set1.isSubsetOf(set2)).toBeFalsy();

        const set3 = new MySet(1, 2, 3, 4, 5, 6, 7);
        const set4 = new MySet(1, 3, 5, 7);
        expect(set4.isSubsetOf(set3)).toBeTruthy();
    });

    test('intersection', () => {
        const set1 = new MySet(1, 2, 3, 4);
        const set2 = new MySet(3, 4, 5, 6);

        expect(set1.intersection(set2)).toEqual([3, 4]);
    });

    test('union', () => {
        const set1 = new MySet(1, 2, 3, 4);
        const set2 = new MySet(3, 4, 5, 6);

        expect(set1.union(set2)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('diference', () => {
        const set1 = new MySet(1, 2, 3, 4);
        const set2 = new MySet(3, 4, 5, 6);

        expect(set1.diferenceOf(set2)).toEqual([5, 6]);
    });
});