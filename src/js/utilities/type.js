const type = (element, copy, cb = () => {}, speed = 15) => {
  const initialSplit = copy.split(/(<[^><]*>)/gi);
  const typed = [];
  let characters = [];

  console.log(initialSplit);

  initialSplit.forEach(chunk => {
    if (chunk[0] !== '<') {
      characters = characters.concat(chunk.split(''));
    } else {
      characters.push(chunk);
    }
  });

  console.log(characters);

  const keypress = () => {
    typed.push(characters[0]);
    document.querySelector(element).innerHTML = typed.join('');
    characters.splice(0, 1);

    if (characters.length !== 0) {
      setTimeout(() => {
        keypress();
      }, speed);
    } else {
      document.querySelector(element).classList.remove('tm-u-type--typing');
      cb();
    }
  };

  document.querySelector(element).classList.add('tm-u-type--typing');
  keypress();
};

export { type };
