// на вход дается массив состоящий из чисел.
// Написать функцию, которая вернет сумму всех элементов

const numbers = [123, 438, 252, 12, 48, 1488, 1337];

let sum = 0;

function numbersSum() {
  for (i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

console.log(numbersSum());
