import { Player } from 'instances/player';
import Card from 'components/card';
import Cards from 'library/cards';

function create() {
  const shop = `
    <div class="tm-c-shop">
      <div class="tm-c-shop__heading">Mysterious merchant</div>
      <div class="tm-c-shop__cards">
        ${Cards.filter(card => card.price !== undefined).map(card => {
          return `
            <div class="tm-c-shop__card-container">
              ${Card(card, true)}
              <div class="tm-c-shop__card-price">${card.price} gold</div>
              <div class="tm-c-shop__card-buy js-buy">Buy</div>
            </div>
          `;
        }).join('')}
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
