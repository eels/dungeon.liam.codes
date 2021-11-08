import Store from 'utilities/store';

export default class Creature {
  constructor(creature) {
    this.store = new Store({
      raw: creature,
      hp: creature.health,
      maxHp: creature.health,
      mp: creature.mana,
      maxMp: creature.mana,
      armor: creature.armor,
      ad: creature.armorDurability,
      maxAd: creature.armorDurability,
      status: 'normal',
      statusDuration: 0,
    });
  }
}
