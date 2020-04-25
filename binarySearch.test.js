const quickSort = require('./quickSort.test.js');

const binarySearch = (arr, target, startIndex = 0, endIndex = arr.length -1) => {
  const middleIndex = selectMiddleIndex(startIndex, endIndex);
  
  if (target === arr[middleIndex]) {
    return middleIndex;
  }
  
  if (target < arr[middleIndex]) {
    endIndex = middleIndex - 1;
    return binarySearch(arr, target, startIndex, endIndex);
  }
  
  if (target > arr[middleIndex]) {
    startIndex = middleIndex + 1;
    return binarySearch(arr, target, startIndex, endIndex);
  }
};

const selectMiddleIndex = (startIndex, endIndex) => 
  Math.ceil((startIndex + endIndex) / 2);

test('binarySearch', () => {
  const phoneBook = [
    { name: 'f', phone: 6 },
    { name: 'b', phone: 2 },
    { name: 'd', phone: 4 },
    { name: 'c', phone: 3 },
    { name: 'a', phone: 1 },
    { name: 'e', phone: 5 },
  ];

  expect(binarySearch(quickSort(phoneBook).map(({name}) => name), 'c')).toBe(2);
  expect(binarySearch(quickSort(phoneBook).map(({name}) => name), 'a')).toBe(0);
});

const arr = [1, 2, 3, 4, 5];
