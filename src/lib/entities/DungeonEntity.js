import CreatureEntity from 'lib/entities/CreatureEntity';
import StatefulEntity from 'lib/state/StatefulEntity';
import bosses from 'data/bosses';
import chance from 'utilities/chance';
import creatures from 'data/creatures';
import dispatch from 'events/delegate/dispatch';
import shuffle from 'utilities/shuffle';
import uuid from 'utilities/uuid';
import { ENTER_SHOP, PLAYER_UPDATE_STATS } from 'events/events';

export default class DungeonEntity extends StatefulEntity {
  constructor(dungeon) {
    super(dungeon);

    this.setState({ creatures: this.generateDungeonCreatures() }).commit();
  }

  advance() {
    const dungeonCreatures = [...this.creatures];

    dungeonCreatures.splice(0, 1);

    if (dungeonCreatures.length === 0) {
      dispatch(PLAYER_UPDATE_STATS);
      dispatch(ENTER_SHOP);
    }

    this.setState({ creatures: dungeonCreatures }).commit();
  }

  generateDungeonBoss() {
    const creature = shuffle(bosses)[0];
    const modifier = this.level * 1.5;

    return Array.from(Array(1).keys()).map(() => {
      return new CreatureEntity(
        Object.assign({ id: uuid(), isBoss: true }, creature, {
          armor: creature.armor * modifier,
          attack: creature.attack * modifier,
          gold: creature.gold * modifier,
          health: creature.health * modifier,
          mana: creature.mana * modifier,
          modifier: modifier,
        }),
      );
    });
  }

  generateDungeonCreatures() {
    if (this.level % 2 === 0 && chance(1)) {
      return this.generateDungeonBoss();
    }

    const ceiling = creatures.reduce((highest, creature) => Math.max(highest, creature.level), 0);
    const level = this.level < ceiling ? this.level : ceiling;
    const range = [level - 1, level];
    const availableCreatures = creatures.filter((creature) => range.includes(creature.level));
    const curve = level + 2;

    return Array.from(Array(curve).keys()).map(() => {
      return new CreatureEntity(Object.assign({ id: uuid() }, shuffle(availableCreatures)[0]));
    });
  }
}
