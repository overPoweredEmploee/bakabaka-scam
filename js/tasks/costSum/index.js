// на вход дается массив состоящий из чисел.
// Написать функцию, которая вернет сумму всех элементов

const numbers = [123, 438, 252, 12, 48, 1488, 1337];

function numbersSum(array) {
  const sum = array.reduce((a, b) => a + b, 0);
  return sum;
}

console.log(numbersSum(numbers));
