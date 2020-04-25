const quickSort = (arr) => {
  if (arr.length === 0) {
    return [];
  }

  const pivot = getPivot(arr);
  const left = [];
  const right = [];
  
  removePivotFromArray(arr);
  distributeValue(arr, pivot, left, right);

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const getPivot = (arr) => arr[arr.length -1]
const removePivotFromArray = (arr) => arr.pop();
const distributeValue = (arr, target, left, right) => {
  arr.forEach(v => {
    if (target.phone < v.phone) {
      right.push(v);
    } else {
      left.push(v);
    }
  });
}

describe('quickSort', () => {
  it('returns sorted array', () => {
    const phoneBook = [
      { name: 'f', phone: 6 },
      { name: 'b', phone: 2 },
      { name: 'd', phone: 4 },
      { name: 'c', phone: 3 },
      { name: 'a', phone: 1 },
      { name: 'e', phone: 5 },
    ];

    const expectResult = [
      { name: 'a', phone: 1 },
      { name: 'b', phone: 2 },
      { name: 'c', phone: 3 },
      { name: 'd', phone: 4 },
      { name: 'e', phone: 5 },
      { name: 'f', phone: 6 },
    ];

    expect(quickSort(phoneBook)).toEqual(expectResult);
  });
});

module.exports = quickSort;
