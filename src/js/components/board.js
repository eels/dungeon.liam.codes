import Creature from 'components/creature';
import Hand from 'components/hand';
import Log from 'components/log';
import Message from 'components/message';
import Timer from 'components/timer';

function create() {
  const board = `
    <div class="tm-c-board">
      <div class="tm-c-board__timer">${Timer()}</div>
      <div class="tm-c-board__creature">${Creature()}${Log()}</div>
      <div class="tm-c-board__hand">${Hand()}</div>
      <div class="tm-c-board__message">${Message()}</div>
    </div>
  `;

  return board;
}

export default function() {
  return create();
};
