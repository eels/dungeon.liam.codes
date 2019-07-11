import Store from 'utilities/store';

export default class {
  constructor(creature) {
    this.store = new Store({
      raw: creature,
      hp: creature.health,
      maxHp: creature.health,
      mp: creature.mana,
      maxMp: creature.mana
    });
  }
};
