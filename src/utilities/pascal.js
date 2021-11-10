import capitalize from 'utilities/capitalize';

export default function pascal(string = '') {
  const words = string.split('-');
  const capitalized = capitalize(words.join(' '));

  return capitalized.split(' ').join('');
}
