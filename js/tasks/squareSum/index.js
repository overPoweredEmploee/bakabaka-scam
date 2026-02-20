// на вход дается массив чисел
// написать функцию которая вернет сумму квадратов этих чисел
// можно использовать только методы массива

const arr = [2, 3, 4, 5];

function squareSum(array) {
  const sum = array.reduce((a, b) => a + b ** 2, 0);
  return sum;
}

console.log(squareSum(arr));
