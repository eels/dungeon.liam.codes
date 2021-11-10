import StatefulEntity from 'lib/state/StatefulEntity';
import dispatch from 'events/delegate/dispatch';
import processCombatQueue, { combatQueue } from 'functions/process-combat-queue';
import { TICK, TICK_SEGMENT } from 'events/events';

export default class TickEntity extends StatefulEntity {
  tick() {
    this.setState({ pointer: this.pointer + 50 }).commit();
  }

  pause() {
    clearInterval(this.interval);
    clearInterval(combatQueue);
  }

  reset() {
    this.setState({ pointer: 0 }).commit();
  }

  start() {
    const interval = setInterval(() => {
      dispatch(TICK_SEGMENT);
      this.tick();

      if (this.pointer === this.target + 50) {
        dispatch(TICK);
        this.reset();
      }
    }, 50);

    this.setState({ interval }).commit();
    processCombatQueue();
  }

  stop() {
    this.pause();
    this.reset();
  }
}
