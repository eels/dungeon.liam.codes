export default function padding(copy, length, value = '0') {
  const bufferLength = copy.toString().length + length;
  const buffer = Array.from(Array(bufferLength)).map(() => value);

  return `${buffer.join('')}${copy}`.slice(length * -1);
}
