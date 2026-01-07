// на вход дается массив состоящий из чисел.
// Написать функцию, которая вернет сумму всех элементов

const numbers = [123, 438, 252, 12, 48, 1488, 1337];

function numbersSum(arr) {
  let sum = 0;
  for (i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

console.log(numbersSum(numbers));
