import { Player } from 'instances/player';
import Card from 'components/card';
import Cards from 'library/cards';

function create() {
  const treasure = `
    <div class="tm-c-treasure">
      <div class="tm-c-treasure__heading">Illustrious treasure room</div>
      <div class="tm-c-treasure__cards">
        ${Cards.filter(card => card.price !== undefined).slice(0, 3).map(card => {
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
