import Timer from 'components/timer';
import Hand from 'components/hand';
import Creature from 'components/creature';
import { Player } from 'instances/player';

function create() {
  const board = `
    <div class="tm-c-board">
      <div class="tm-c-board__timer">${Timer()}</div>
      <div class="tm-c-board__creature">${Creature()}</div>
      <div class="tm-c-board__hand">${Hand()}</div>
    </div>
  `;

  return board;
}

export default function() {
  return create();
};
