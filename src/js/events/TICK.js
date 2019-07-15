import { on, fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { Tick } from 'instances/tick';
import DeathScreen from 'components/death-screen';

export default function() {
  on('TICK', 'body', event => {
    const creature = Dungeon.store.state.creatures[0];

    if (creature.store.state.status === 'ice') {
      const duration = creature.store.state.statusDuration - 1;
      creature.store.commit({ statusDuration: duration });

      fire('CREATURE_UPDATE');

      if (duration >= 0) {
        return;
      }

      creature.store.commit({ status: 'normal' });
      fire('CREATURE_UPDATE');
    }

    const hit = Player.store.state.hp - creature.store.state.raw.attack;
    Player.store.commit({ hp: hit > 0 ? hit : 0 });
    fire('PLAYER_UPDATE_STATS');

    if (hit <= 0) {
      Tick.stop();
      Player.store.commit({ status: 'paused' });
      Player.store.commit({ actionTaken: true });
      document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
      document.querySelector('.tm-c-stats').classList.add('tm-c-stats--disabled');
      document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');
      document.querySelector('.tm-c-message__container').innerHTML = DeathScreen();
    }
  });
};
