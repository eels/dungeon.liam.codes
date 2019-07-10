import { fire } from 'utilities/delegation';
import Store from 'utilities/store';

export default class {
  constructor() {
    this.store = new Store({
      length: 3000
    });
  }

  process() {
    setInterval(() => {
      fire('TICK');
    }, this.store.state.length);
  }
};
