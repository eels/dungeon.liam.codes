import { nodize } from 'utilities/nodize';

const addToDiscard = () => {
  const pile = document.querySelector('.js-discard');
  const card = nodize('<div class="tm-c-hand__card tm-c-card"></div>');
  const cardRoot = card.querySelector('.tm-c-hand__card');
  let axis = 1;

  if (pile.lastChild && parseFloat(pile.lastChild.style.transform.match(/[\-\d\.]+/)) > 0) {
    axis = -1;
  }

  cardRoot.style.transform = `rotate(${(Math.round(Math.random() * 6) + 6) * axis}deg)`;

  if (pile.children.length === 4) {
    pile.removeChild(pile.firstChild);
  }

  pile.appendChild(card);
};

export { addToDiscard };
