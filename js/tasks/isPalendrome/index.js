// на вход дается строка
// нужно вернуть true если строка является палиндромом
// игнорируя пробелы и знаки препинания
// false для остальных случаев

const strings = [
  '121',
  '13250',
  'bob',
  'bob and bob',
  'Муза, ранясь шилом опыта, ты помолишься на разум.',
  'Мать твоя прексаная женщина, без шуток',
  'А роза упала на лапу Азора',
  'Аргентина манит негра',
];

function isPalindrome(str) {
  const redactedString = str.toLowerCase().replace(/[^a-zа-я0-9]/gi, '');
  return redactedString === redactedString.split('').reverse().join('');
}

for (let i = 0; i < strings.length; i++) {
  console.log(isPalindrome(strings[i]));
}

isPalindrome(strings);
