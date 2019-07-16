import { fire } from 'utilities/delegation';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';
import { processPlayerDeath } from 'functions/process-player-death';

const processPlayerStatusEffect = () => {
  const status = Player.store.state.status;

  if (['ice', 'electric'].indexOf(status) > -1) {
    const statusDuration = Player.store.state.statusDuration - 1;
    Player.store.commit({ statusDuration: statusDuration });
    fire('PLAYER_UPDATE_STATS');

    if (statusDuration >= 0) {
      fire('PLAYER_ACTION', { 'PLAYER_ACTION': true });
      document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
      return;
    }

    Player.store.commit({ status: 'normal' });
    fire('PLAYER_UPDATE_STATS');
  }

  if (['fire', 'poision'].indexOf(status) > -1) {
    const statusDuration = Player.store.state.statusDuration - 1;
    Player.store.commit({ statusDuration: statusDuration });
    fire('PLAYER_UPDATE_STATS');

    if (statusDuration >= 0) {
      const percentageDamage = Math.floor(Player.store.state.maxHp * (5 / 100));
      const statusDamage = Player.store.state.hp - percentageDamage;

      log(`* >> You take ${percentageDamage} damage from your <div class="tm-c-log__keyword">${status === 'fire' ? 'burn' : 'poison'}</div>`);

      Player.store.commit({ hp: statusDamage > 0 ? statusDamage : 0 });
      fire('PLAYER_UPDATE_STATS');

      if (statusDamage <= 0) {
        processPlayerDeath();
        return;
      }
    } else {
      Player.store.commit({ status: 'normal' });
      fire('PLAYER_UPDATE_STATS');
    }
  }

  fire('PLAYER_ACTION', { 'PLAYER_ACTION': false });
  document.querySelector('.tm-c-hand').classList.remove('tm-c-hand--disabled');
};

export { processPlayerStatusEffect };
