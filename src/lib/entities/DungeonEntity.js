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

    this.setState({ creatures: this.generateDungeonCreatures() }).commit();
  }

  advance() {
    const dungeonCreatures = [...this.creatures];

    dungeonCreatures.splice(0, 1);

    if (dungeonCreatures.length === 0) {
      dispatch(ENTER_SHOP);
    }

    this.setState({ creatures: dungeonCreatures }).commit();
  }

  generateDungeonCreatures() {
    const ceiling = creatures.reduce((highest, creature) => Math.max(highest, creature.level), 0);
    const level = this.level < ceiling ? this.level : ceiling;
    const range = [level - 1, level];
    const availableCreatures = creatures.filter((creature) => range.includes(creature.level));
    const curve = Math.floor(level * (1 + level / 20)) + 2;

    return Array.from(Array(curve).keys()).map(() => {
      return new CreatureEntity(Object.assign({ id: uuid() }, shuffle(availableCreatures)[0]));
    });
  }
}
