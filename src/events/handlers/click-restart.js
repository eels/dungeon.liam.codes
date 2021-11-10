import Dungeon, { initialDungeonState } from 'instances/Dungeon';
import Player, { initialPlayerState } from 'instances/Player';
import Tick from 'instances/Tick';
import Timer from 'components/Timer';
import bind from 'events/delegate/bind';
import dispatch from 'events/delegate/dispatch';
import nodize from 'utilities/nodize';
import { CREATURE_UPDATE, PLAYER_UPDATE_HAND, PLAYER_UPDATE_STATS } from 'events/events';

bind('click', '.js-restart', function () {
  Player.setState(initialPlayerState).commit();
  Player.setInitialDeckState();

  Dungeon.setState(initialDungeonState).commit();
  Dungeon.setState({ creatures: Dungeon.generateCreatures() }).commit();

  Tick.start();

  document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');
  document.querySelector('.tm-c-log__container').innerHTML = '';

  const timer = document.querySelector('.tm-c-timer');

  timer.parentNode.insertBefore(nodize(Timer()), timer);
  timer.parentNode.removeChild(timer);

  dispatch(CREATURE_UPDATE);
  dispatch(PLAYER_UPDATE_HAND);
  dispatch(PLAYER_UPDATE_STATS);
});

export default true;
