import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import dispatch from 'events/delegate/dispatch';
import playCard from 'functions/play-card';
import { PLAYER_ACTION } from 'events/events';

bind('click', '.js-card', function (event) {
  if (Player.actionTaken) {
    return;
  }

  playCard(event.selector.getAttribute('data-id'));
  dispatch(PLAYER_ACTION);

  document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
});

export default true;
