import nodize from 'utilities/nodize';

export default function addToDiscard() {
  const pile = document.querySelector('.js-discard');
  const card = nodize('<div class="tm-c-hand__card tm-c-card"></div>');
  const cardRoot = card.querySelector('.tm-c-hand__card');

  if (pile.children.length === 4) {
    pile.removeChild(pile.firstChild);
  }

  const lastChild = pile.lastChild;
  const lastChildTransform = lastChild && lastChild.style.transform;
  const lastAngle = lastChild && parseFloat(lastChildTransform.match(/[-\d.]+/));
  const axis = lastAngle < 0 ? 1 : -1;
  const degree = (Math.round(Math.random() * 6) + 6) * axis;

  cardRoot.style.transform = `rotate(${degree}deg)`;

  pile.appendChild(card);
}
