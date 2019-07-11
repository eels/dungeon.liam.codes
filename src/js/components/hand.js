import Card from 'components/card';
import { Player } from 'instances/player';

function create() {
  const hand = `
    <div class="tm-c-hand">
      ${Player.store.state.deck.slice(0, 5).map(card => {
        return Card(card);
      }).join('')}
      <div class="tm-c-hand__discard js-discard"></div>
    </div>
  `;

  return hand;
}

export default function() {
  return create();
};
