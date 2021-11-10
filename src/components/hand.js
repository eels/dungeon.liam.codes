import Card from 'components/Card';
import Player from 'instances/Player';

export default function Hand() {
  const PlayableHand = Player.deck.slice(0, 5);
  const CardHandArray = PlayableHand.map((card) => Card(card));

  return `
    <div class="tm-c-hand">
      ${CardHandArray.join('')}
      <div class="tm-c-hand__discard js-discard"></div>
    </div>
  `;
}
