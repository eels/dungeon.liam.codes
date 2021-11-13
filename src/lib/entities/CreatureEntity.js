import StatefulEntity from 'lib/state/StatefulEntity';
import capitalize from 'utilities/capitalize';

export default class CreatureEntity extends StatefulEntity {
  constructor(creature) {
    super({
      actionTaken: false,
      ad: creature.armor,
      armor: creature.armor,
      hp: creature.health,
      isBoss: creature.isBoss ?? false,
      maxAd: creature.armor,
      maxHp: creature.health,
      maxMp: creature.mana,
      mp: creature.mana,
      name: capitalize(creature.name),
      raw: creature,
      statModifier: creature.modifier ?? 1,
      status: 'normal',
      statusDuration: 0,
    });
  }
}
