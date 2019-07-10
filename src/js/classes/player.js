import { shuffle } from 'utilities/array';
import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import Timer from 'components/timer';
import Store from 'utilities/store';

import Cards from 'library/cards';

export default class {
  constructor(TickInstance) {
    this.store = new Store({
      actionTaken: false,
      status: 'ticking',
      hp: 50,
      maxHp: 50,
      mp: 50,
      maxMp: 50,
      deck: []
    });

    this.TickInstance = TickInstance;
    this.store.commit({ deck: this.generateDeck() });
  }

  tick() {
    setInterval(() => {
      const timer = document.querySelector('.tm-c-timer');
      const width = parseFloat(timer.style.width) + (100 / (this.TickInstance.store.state.length / 50));

      if (this.store.state.status === 'paused' || this.store.state.status === 'staged') {
        return;
      }

      if (width > 100) {
        timer.parentNode.insertBefore(nodize(Timer()), timer);
        timer.parentNode.removeChild(timer);
        fire('PLAYER_ACTION', { 'PLAYER_ACTION': false });
      } else {
        timer.style.width = `${width}%`;
      }
    }, 50);

    on('TICK', 'body', event => {
      if (this.store.state.status === 'staged') {
        this.store.commit({ status: 'ticking' });
      }
    });
  }

  generateDeck() {
    return Array.apply(null, { length: 40 }).map(() => shuffle(Cards)[0]);
  }
};
