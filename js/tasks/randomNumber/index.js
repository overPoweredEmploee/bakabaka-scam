//Создать игру "Угадай число"

const secretNum = Math.ceil(Math.random() * 10);
let tries = 0;

function guessNum(num) {
  if (tries < 5) {
    if (num == secretNum) {
      alert('Правильно');
      tries = 5;
    } else {
      tries++;
      alert(`Неправильно. Использовано попыток: ${tries}`);
      if (num > secretNum) {
        alert('Загаданное число меньше');
      } else {
        alert('Загаданное число больше');
      }
    }
  } else {
    alert(`Игра окончена, загаданное число — ${secretNum}`);
  }
}
