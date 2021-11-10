import Player from 'instances/Player';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import { PLAYER_ACTION, PLAYER_UPDATE_STATS } from 'events/events';

export default function processPlayerStatusEffects() {
  const status = Player.status;
  const hasIceElectricEffect = ['ice', 'electric'].includes(status);
  const hasFirePoisonEffect = ['fire', 'poison'].includes(status);

  if (hasIceElectricEffect) {
    Player.setState({ statusDuration: Player.statusDuration - 1 }).commit();

    if (Player.statusDuration !== 0) {
      dispatch(PLAYER_ACTION);
      document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
    }

    if (Player.statusDuration === 0) {
      Player.setState({ status: 'normal' }).commit();
    }
  }

  if (hasFirePoisonEffect) {
    Player.setState({ statusDuration: Player.statusDuration - 1 }).commit();

    if (Player.statusDuration !== 0) {
      const damage = Math.ceil(Player.hp * (20 / 100));

      log(
        `* >> You take ${damage} damage from your <div class="tm-c-log__keyword">${
          status === 'fire' ? 'burn' : 'poison'
        }</div>`,
      );

      Player.setState({ hp: Math.max(Player.hp - damage, 0) }).commit();
    }

    if (Player.statusDuration === 0) {
      Player.setState({ status: 'normal' }).commit();
    }
  }

  dispatch(PLAYER_UPDATE_STATS);
}
