import { shuffle } from 'utilities/array';
import { fire } from 'utilities/delegation';
import Store from 'utilities/store';
import Creature from 'classes/creature';
import Creatures from 'library/creatures';

export default class {
  constructor(state) {
    this.store = new Store(state);
    this.store.commit({ creatures: this.generateCreatures() });
  }

  generateCreatures() {
    const level = this.store.state.level;
    const curve = Math.floor(level * (1 + (level / 5))) + 2;
    return Array.apply(null, Array(curve)).map(() => {
      const shuffledCreatures = shuffle(Creatures);
      const creature = Object.assign({}, shuffledCreatures[0]);
      creature.id = Math.round(Math.random() * (999999999 - 100000000) + 100000000);
      return new Creature(creature);
    });
  }

  advance() {
    const creatures = this.store.state.creatures.slice(0);
    creatures.splice(0, 1);

    if (creatures.length > 0) {
      this.store.commit({ creatures: creatures });
    } else {
      this.store.commit({ level: this.store.state.level + 1 });
      this.store.commit({ creatures: this.generateCreatures() });
      fire('PLAYER_UPDATE_STATS');
    }
  }
};
