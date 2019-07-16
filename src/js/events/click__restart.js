import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { Tick } from 'instances/tick';
import Timer from 'components/timer';

export default function() {
  on('click', '.js-restart', () => {
    Player.store.commit({
      actionTaken: false,
      status: 'normal',
      statusDuration: 0,
      deck: Player.generateDeck(),
      gold: 0,
      totalGold: 0,
      kills: 0,
      hp: Player.store.state.maxHp,
      mp: Player.store.state.maxMp,
      armor: 0,
      ad: 0,
      maxAd: 0
    });

    Dungeon.store.commit({
      level: 1,
      creatures: []
    });

    Dungeon.store.commit({
      creatures: Dungeon.generateCreatures()
    });

    Tick.start();

    document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');
    document.querySelector('.tm-c-log__container').innerHTML = '';
    const timer = document.querySelector('.tm-c-timer');
    timer.parentNode.insertBefore(nodize(Timer()), timer);
    timer.parentNode.removeChild(timer);

    fire('PLAYER_UPDATE_STATS');
    fire('PLAYER_UPDATE_HAND');
    fire('CREATURE_UPDATE');
  });
};
