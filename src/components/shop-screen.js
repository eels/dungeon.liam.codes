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
    return a.price - b.price;
  });

  return sortedCards;
}

function create() {
  const shop = `
    <div class="tm-c-shop">
      <div class="tm-c-shop__heading">Mysterious merchant</div>
      <div class="tm-c-shop__cards">
        ${getInventory().map(card => {
          return `
            <div class="tm-c-shop__card-container">
              ${Card(card, true, 'shop')}
              <div class="tm-c-shop__card-price">${card.price} gold</div>
              <div class="tm-c-shop__card-buy js-buy">Buy</div>
            </div>
          `;
        }).join('')}
        <div class="tm-c-shop__card-container tm-c-shop__card-container-bordered">
          ${Card({
            name: 'divine grace',
            size: '14px',
            keyword: '+25 HP',
            icon: 'divine'
          }, true, 'shop')}
          <div class="tm-c-shop__card-price">20 gold</div>
          <div class="tm-c-shop__card-buy js-heal">Heal</div>
        </div>
      </div>
      <div class="tm-c-shop__status">"Choose wisely, this may be the last decision you ever make..."</div>
      <div class="tm-c-shop__continue js-continue">Continue further into the dungeon</div>
    </div>
  `;

  return shop;
}

export default function() {
  return create();
};
