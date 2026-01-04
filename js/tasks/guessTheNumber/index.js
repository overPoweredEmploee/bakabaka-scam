//Создать игру "Угадай число"

let secretNum;
let tries;

function resetGame() {
  secretNum = Math.ceil(Math.random() * 10);
  tries = 0;
}

resetGame();

function guessNum(num) {
  if (tries >= 5) {
    alert(`Игра окончена, загаданное число — ${secretNum}`);
    resetGame();
    return;
  }

  if (num === secretNum) {
    alert('Правильно');
    resetGame();
    return;
  }

  tries++;
  alert(`Неправильно. Использовано попыток: ${tries}`);
  num > secretNum
    ? alert('Загаданное число меньше')
    : alert('Загаданное число больше');
}
