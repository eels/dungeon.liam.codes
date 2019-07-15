import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { Tick } from 'instances/tick';
import { log } from 'functions/combat-log';
import Timer from 'components/timer';

export default function() {
  on('click', '.js-continue', event => {
    Dungeon.store.commit({ level: Dungeon.store.state.level + 1 });
    Dungeon.store.commit({ creatures: Dungeon.generateCreatures() });
    Player.store.commit({ actionTaken: false, status: 'active', deck: [] });
    Player.store.commit({ deck: Player.generateDeck() });
    document.querySelector('.tm-c-hand').classList.remove('tm-c-hand--disabled');
    document.querySelector('.tm-c-stats').classList.remove('tm-c-stats--disabled');
    document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');

    log(`* << You advance to lv. ${Dungeon.store.state.level}`, 'DUNGEON_ADVANCE');

    Tick.start();

    const timer = document.querySelector('.tm-c-timer');
    timer.parentNode.insertBefore(nodize(Timer()), timer);
    timer.parentNode.removeChild(timer);

    fire('PLAYER_UPDATE_STATS');
    fire('PLAYER_UPDATE_HAND', { 'discard': document.querySelector('.js-discard').children });
    fire('CREATURE_UPDATE');
  });
};
