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
    const availableCreatureLevels = [];
    const levelRange = [];

    Creatures.map(creature => {
      if (availableCreatureLevels.indexOf(creature.level) === -1) {
        availableCreatureLevels.push(creature.level);
      }
    });

    for (let i = 0; i < availableCreatureLevels.length; i++) {
      const current = availableCreatureLevels[i];
      const min = level - 1;
      const max = level;

      if (current >= min && current <= max) {
        levelRange.push(current);
      }
    }

    if (levelRange.length === 0) {
      levelRange.push(availableCreatureLevels[availableCreatureLevels.length - 1]);
    }

    const availableCreatures = Creatures.filter(creature => levelRange.indexOf(creature.level) > -1);
    const curve = Math.floor(level * (1 + (level / 20))) + 2;
    return Array.apply(null, Array(curve)).map(() => {
      const shuffledCreatures = shuffle(availableCreatures);
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
      fire('ENTER_SHOP');
    }
  }
};
