import Card from 'components/Card';
import getRandomCardArray from 'functions/get-random-card-array';
import shuffle from 'utilities/shuffle';
import specials from 'data/specials/cards';

export default function TreasureScreen() {
  const InventoryHand = getRandomCardArray(3).map((card) => {
    return `
      <div class="tm-c-treasure__card-container">
        ${Card(card, true, 'treasure')}
        <div class="tm-c-treasure__card-price"></div>
        <div class="tm-c-treasure__card-take js-take">Take</div>
      </div>
    `;
  });

  const special = shuffle(specials)[0];

  return `
    <div class="tm-c-treasure">
      <div class="tm-c-treasure__heading">Illustrious treasure room</div>
      <div class="tm-c-treasure__cards">
        ${InventoryHand.join('')}
        <div class="tm-c-treasure__card-container tm-c-treasure__card-container-bordered">
          ${Card(special, true, 'treasure')}
          <div class="tm-c-treasure__card-price">${special.price} gold</div>
          <div class="tm-c-treasure__card-take js-special">Heal</div>
        </div>
      </div>
      <div class="tm-c-treasure__status">"Choose wisely... you may only take one"</div>
      <div class="tm-c-treasure__continue js-continue">Continue further into the dungeon</div>
    </div>
  `;
}
