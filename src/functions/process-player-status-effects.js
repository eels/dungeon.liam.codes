import Player from 'instances/Player';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { PLAYER_ACTION, PLAYER_UPDATE_STATS } from 'events/events';

export default function processPlayerStatusEffects() {
  const status = Player.status;

  if (status === 'electric' || status === 'ice') {
    Player.setState({ statusDuration: Player.statusDuration - 1 }).commit();

    if (Player.statusDuration !== 0) {
      const effect = status === 'electric' ? 'paralysed' : 'frozen';

      log(messages.PLAYER_STATUS_EFFECT_DISABLED, [effect]);
      dispatch(PLAYER_ACTION);
      document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
    }

    if (Player.statusDuration === 0) {
      Player.setState({ status: 'normal' }).commit();
    }
  }

  if (status === 'fire' || status === 'poison') {
    Player.setState({ statusDuration: Player.statusDuration - 1 }).commit();

    if (Player.statusDuration !== 0) {
      const damage = Math.ceil(Player.hp * (5 / 100));
      const effect = status === 'fire' ? 'burn' : 'poison';

      Player.setState({ hp: Math.max(Player.hp - damage, 0) }).commit();
      log(messages.PLAYER_STATUS_EFFECT_DAMAGE, [damage, effect]);
    }

    if (Player.statusDuration === 0) {
      Player.setState({ status: 'normal' }).commit();
    }
  }

  dispatch(PLAYER_UPDATE_STATS);
}
