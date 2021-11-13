import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import Tick from 'instances/Tick';
import Timer from 'components/Timer';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import nodize from 'utilities/nodize';
import { CREATURE_UPDATE, PLAYER_UPDATE_HAND, PLAYER_UPDATE_STATS } from 'events/events';

export default function advanceDungeonLevel() {
  Dungeon.setState({ level: Dungeon.level + 1 }).commit();
  Dungeon.setState({ creatures: Dungeon.generateDungeonCreatures() }).commit();

  Player.setState({ actionTaken: false, status: 'active' }).commit();
  Player.setState({ deck: Player.generatePlayableDeck() }).commit();

  document.querySelector('.tm-c-hand').classList.remove('tm-c-hand--disabled');
  document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');

  log(messages.PLAYER_ADVANCE_DUNGEON, [Dungeon.level], 'DUNGEON_ADVANCE');

  Tick.start();

  const timer = document.querySelector('.tm-c-timer');

  timer.parentNode.insertBefore(nodize(Timer()), timer);
  timer.parentNode.removeChild(timer);

  dispatch(CREATURE_UPDATE);
  dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });
  dispatch(PLAYER_UPDATE_STATS);
}
