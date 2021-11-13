export default function padding(string, length, value = '0') {
  const stringLength = string.toString().length;
  const bufferLength = stringLength + length;
  const buffer = Array.from(Array(bufferLength)).map(() => value);

  return `${buffer.join('')}${string}`.slice(Math.max(stringLength, length) * -1);
}
