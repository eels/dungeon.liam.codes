export default function type(element, copy, callback = () => {}, speed = 10) {
  const initialChunks = copy.split(/(<[^><]*>)/gi);
  const characters = [];
  const typed = [];

  for (const chunk of initialChunks) {
    if (chunk[0] !== '<') {
      characters.push(...chunk.split(''));
    } else {
      characters.push(chunk);
    }
  }

  const setTypingState = (state) => {
    document.querySelector(element).classList[state ? 'add' : 'remove']('tm-u-type--typing');
  };

  const keypress = () => {
    typed.push(characters[0]);
    document.querySelector(element).innerHTML = typed.join('');

    characters.splice(0, 1);

    if (characters.length === 0) {
      setTypingState(false);

      return callback();
    }

    setTimeout(keypress, speed);
  };

  setTypingState(true);
  keypress();
}
