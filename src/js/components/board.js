import Timer from 'components/timer';
import { Player } from 'instances/player';

function create() {
  const board = `
    <div class="tm-c-board">
      <div class="tm-c-board__timer">${Timer()}</div>
      <div class="tm-c-board__hand">
        ${Player.store.state.deck.slice(0, 5).map(() => {
          return 'Hello';
        })}
      </div>
    </div>
  `;

  return board;
}

export default function() {
  return create();
};
