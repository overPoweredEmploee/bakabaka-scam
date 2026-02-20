function twoSum(array, sum) {
  const map = {};

  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    const difference = sum - num;

    if (difference in map) {
      return [map[difference], i];
    }

    map[num] = i;
  }
  return [];
}

console.log(twoSum([1, 2, 3, 4, 5, 6, 7, 8], 15));
