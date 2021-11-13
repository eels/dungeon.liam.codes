import Tick from 'instances/Tick';
import bind from 'events/delegate/bind';

bind('click', '.js-start', function () {
  document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');

  Tick.start();
});

export default true;
