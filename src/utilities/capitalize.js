export default function capitalize(string) {
  const words = string.split(' ');

  const array = words.map((word) => {
    return word.length === 2 ? word : word.charAt(0).toUpperCase() + word.slice(1);
  });

  return array.join(' ');
}
