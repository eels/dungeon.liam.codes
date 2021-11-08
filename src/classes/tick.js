import { fire } from 'utilities/delegation';
import Store from 'utilities/store';

export default class Tick {
  constructor() {
    this.store = new Store({
      tick: null,
      length: 3000,
    });
  }

  start() {
    let clock = 0;
    const interval = setInterval(() => {
      fire('TICK_SEGMENT');
      clock = clock + 50;
      if (clock === this.store.state.length) {
        clock = 0;
        fire('TICK');
      }
    }, 50);

    this.store.commit({ tick: interval });
  }

  stop() {
    clearInterval(this.store.state.tick);
  }
}
