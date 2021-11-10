export default function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  array = array.slice(0);

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex = currentIndex - 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
