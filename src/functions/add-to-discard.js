import nodize from 'utilities/nodize';

export default function addToDiscard() {
  const pile = document.querySelector('.js-discard');

  const card = nodize(`
    <div class="tm-c-hand__discard-wrapper tm-c-hand__discard-wrapper--enter">
      <div class="tm-c-hand__card tm-c-card"></div>
    </div>
  `);

  const cardRoot = card.querySelector('.tm-c-hand__card');

  if (pile.children.length === 4) {
    pile.removeChild(pile.firstChild);
  }

  const lastChild = pile.lastChild;
  const lastChildCard = lastChild && lastChild.querySelector('.tm-c-hand__card');
  const lastChildTransform = lastChildCard && lastChildCard.style.transform;
  const lastAngle = lastChildCard && parseFloat(lastChildTransform.match(/[-\d.]+/));
  const axis = lastAngle < 0 ? 1 : -1;
  const degree = (Math.round(Math.random() * 6) + 6) * axis;

  cardRoot.style.transform = `rotate(${degree}deg)`;

  pile.appendChild(card);

  setTimeout(() => {
    const newChild = document.querySelector('.js-discard').lastChild;

    newChild.classList.remove('tm-c-hand__discard-wrapper--enter');
  }, 500);
}
