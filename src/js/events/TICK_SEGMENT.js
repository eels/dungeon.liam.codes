import { on, fire } from 'utilities/delegation';
import { Player } from 'instances/player';
import { Tick } from 'instances/tick';

export default function() {
  on('TICK_SEGMENT', 'body', event => {
    const timer = document.querySelector('.tm-c-timer');
    const currentWidth = parseFloat(timer.style.width);
    const increment = ((100 / (Tick.store.state.length / 50) * 100)) / 100;
    const width = currentWidth + increment;
    timer.style.width = `${width}%`;
  });
};
