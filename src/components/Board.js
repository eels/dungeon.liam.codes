import Creature from 'components/Creature';
import Hand from 'components/Hand';
import Log from 'components/Log';
import Message from 'components/Message';
import Timer from 'components/Timer';

export default function Board() {
  return `
    <div class="tm-c-board js-board">
      <div class="tm-c-board__timer">${Timer()}</div>
      <div class="tm-c-board__creature">
        ${Creature()}${Log()}
      </div>
      <div class="tm-c-board__hand">${Hand()}</div>
      <div class="tm-c-board__message">${Message()}</div>
    </div>
  `;
}
