import { shuffle } from 'utilities/array';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import Card from 'components/card';
import Cards from 'library/cards';

function getInventory() {
  const cardPool = Cards.filter(card => card.set <= Dungeon.store.state.level);
  const shuffledPool = shuffle(cardPool);
  const selectedCards = shuffledPool.slice(0, 3);

  const sortedCards = selectedCards.sort((a, b) => {
    return a.set - b.set;
  });

  return sortedCards;
}

function create() {
  const treasure = `
    <div class="tm-c-treasure">
      <div class="tm-c-treasure__heading">Illustrious treasure room</div>
      <div class="tm-c-treasure__cards">
        ${getInventory().map(card => {
          return `
            <div class="tm-c-treasure__card-container">
              ${Card(card, true, 'treasure')}
              <div class="tm-c-treasure__card-take js-take">Take</div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="tm-c-treasure__status">"Choose wisely... you may only take one"</div>
      <div class="tm-c-treasure__continue js-continue">Continue further into the dungeon</div>
    </div>
  `;

  return treasure;
}

export default function() {
  return create();
};
