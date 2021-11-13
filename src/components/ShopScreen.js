import Card from 'components/Card';
import getRandomCardArray from 'functions/get-random-card-array';
import shuffle from 'utilities/shuffle';
import specials from 'data/specials/cards';

export default function ShopScreen() {
  const InventoryHand = getRandomCardArray(3).map((card) => {
    return `
      <div class="tm-c-shop__card-container">
        ${Card(card, true, 'shop')}
        <div class="tm-c-shop__card-price">${card.price} gold</div>
        <div class="tm-c-shop__card-buy js-buy">Buy</div>
      </div>
    `;
  });

  const special = shuffle(specials)[0];

  return `
    <div class="tm-c-shop">
      <div class="tm-c-shop__heading">Mysterious merchant</div>
      <div class="tm-c-shop__cards">
        ${InventoryHand.join('')}
        <div class="tm-c-shop__card-container tm-c-shop__card-container-bordered">
          ${Card(special, true, 'shop')}
          <div class="tm-c-shop__card-price">${special.price} gold</div>
          <div class="tm-c-shop__card-buy js-special">Receive</div>
        </div>
      </div>
      <div class="tm-c-shop__status">"Choose wisely, this may be your last decision..."</div>
      <div class="tm-c-shop__continue js-continue">Continue further into the dungeon</div>
    </div>
  `;
}
