export default function hydrate(string, variables = [], keywords = []) {
  const words = string.split(' ');
  const hydrated = [];

  for (let word of words) {
    word = word.replace(/%\d+/g, (num) => variables[parseInt(num.replace('%', '')) - 1]);
    word = keywords.includes(word) ? `<span>${word}</span>` : word;

    hydrated.push(word);
  }

  return hydrated.join(' ');
}
