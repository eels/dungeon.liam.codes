export default function uuid() {
  return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, (character) => {
    const randomValue = crypto.getRandomValues(new Uint8Array(1))[0];

    return (character ^ (randomValue & (15 >> (character / 4)))).toString(16);
  });
}
