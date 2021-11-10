import CreatureEntity from 'lib/entities/CreatureEntity';
import StatefulEntity from 'lib/state/StatefulEntity';
import creatures from 'data/creatures';
import dispatch from 'events/delegate/dispatch';
import shuffle from 'utilities/shuffle';
import uuid from 'utilities/uuid';
import { ENTER_SHOP } from 'events/events';

export default class DungeonEntity extends StatefulEntity {
  constructor(dungeon) {
    super(dungeon);

    this.setState({ creatures: this.generateCreatures() }).commit();
  }

  advance() {
    const dungeonCreatures = [...this.creatures];

    dungeonCreatures.splice(0, 1);

    if (dungeonCreatures.length === 0) {
      dispatch(ENTER_SHOP);
    }

    this.setState({ creatures: dungeonCreatures }).commit();
  }

  generateCreatures() {
    const level = this.level;
    const availableCreatureLevels = [];
    const range = [];

    for (const creature of creatures) {
      if (!availableCreatureLevels.includes(creature.level)) {
        availableCreatureLevels.push(creature.level);
      }
    }

    for (const creatureLevel of availableCreatureLevels) {
      if (creatureLevel >= level - 1 && creatureLevel <= level) {
        range.push(creatureLevel);
      }
    }

    if (range.length === 0) {
      range.push(availableCreatureLevels[availableCreatureLevels.length - 1]);
    }

    const availableCreatures = creatures.filter((creature) => range.includes(creature.level));
    const curve = Math.floor(level * (1 + level / 20)) + 2;

    return Array.from(Array(curve).keys()).map(() => {
      const shuffledCreatures = shuffle(availableCreatures);
      const creature = Object.assign({ id: uuid() }, shuffledCreatures[0]);

      return new CreatureEntity(creature);
    });
  }
}
