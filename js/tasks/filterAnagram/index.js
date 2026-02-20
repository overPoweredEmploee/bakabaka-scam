// на вход дается массив строк
// нужно отфильтровать все анаграммы, оставив только оригинал

const strings = [
  'таксис',
  'исксант',
  'синтаксис',
  'ананас',
  'синтаксис',
  'нанаса',
  'икамбокам',
  'бокамикам',
  'синтксиса',
  'кот',
  'ток',
];

function filterAnagram(array) {
  const map = {};
  const sorted = [];

  for (let i = 0; i < array.length; i++) {
    const word = array[i];
    const alreadySeen = word.split('').sort().join('');

    if (alreadySeen in map) {
      continue;
    }
    map[alreadySeen] = i;
    sorted.push(word);
  }
  return sorted;
}

console.log(filterAnagram(strings));
