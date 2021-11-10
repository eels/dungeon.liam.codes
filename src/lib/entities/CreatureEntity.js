import StatefulEntity from 'lib/state/StatefulEntity';

export default class CreatureEntity extends StatefulEntity {
  constructor(creature) {
    super({
      actionTaken: false,
      ad: creature.armorDurability,
      armor: creature.armor,
      hp: creature.health,
      maxAd: creature.armorDurability,
      maxHp: creature.health,
      maxMp: creature.mana,
      mp: creature.mana,
      raw: creature,
      status: 'normal',
      statusDuration: 0,
    });
  }
}
