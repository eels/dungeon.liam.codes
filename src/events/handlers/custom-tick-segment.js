import Tick from 'instances/Tick';
import bind from 'events/delegate/bind';
import { TICK_SEGMENT } from 'events/events';

bind(TICK_SEGMENT, 'body', function () {
  const timer = document.querySelector('.tm-c-timer');
  const currentWidth = parseFloat(timer.style.width);
  const increment = ((100 / (Tick.target / 50)) * 100) / 100;
  const width = currentWidth + increment;

  timer.style.width = `${width}%`;
});

export default true;
