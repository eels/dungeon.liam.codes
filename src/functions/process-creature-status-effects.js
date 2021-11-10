import Dungeon from 'instances/Dungeon';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureStatusEffects() {
  const creature = Dungeon.creatures[0];
  const status = creature.status;
  const hasIceElectricEffect = ['ice', 'electric'].includes(status);
  const hasFirePoisonEffect = ['fire', 'poison'].includes(status);

  if (hasIceElectricEffect) {
    creature.setState({ statusDuration: creature.statusDuration - 1 }).commit();

    if (creature.statusDuration !== 0) {
      creature.setState({ actionTaken: true }).commit();
    }

    if (creature.statusDuration === 0) {
      creature.setState({ status: 'normal' }).commit();
    }
  }

  if (hasFirePoisonEffect) {
    creature.setState({ statusDuration: creature.statusDuration - 1 }).commit();

    if (creature.statusDuration !== 0) {
      const damage = Math.ceil(creature.hp * (20 / 100));

      log(
        `* << Enemy ${capitalize(
          creature.raw.name,
        )} takes ${damage} damage from its <div class="tm-c-log__keyword">${
          status === 'fire' ? 'burn' : 'poison'
        }</div>`,
      );

      creature.setState({ hp: Math.max(creature.hp - damage, 0) }).commit();
    }

    if (creature.statusDuration === 0) {
      creature.setState({ status: 'normal' }).commit();
    }
  }

  dispatch(CREATURE_UPDATE);
}
