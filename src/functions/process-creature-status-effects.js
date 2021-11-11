import Dungeon from 'instances/Dungeon';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureStatusEffects() {
  const creature = Dungeon.creatures[0];
  const name = capitalize(creature.raw.name);
  const status = creature.status;

  if (status === 'electric' || status === 'ice') {
    creature.setState({ statusDuration: creature.statusDuration - 1 }).commit();

    if (creature.statusDuration !== 0) {
      const effect = status === 'electric' ? 'paralysed' : 'frozen';

      log(messages.CREATURE_STATUS_EFFECT_DISABLED, [name, effect]);
      creature.setState({ actionTaken: true }).commit();
    }

    if (creature.statusDuration === 0) {
      creature.setState({ status: 'normal' }).commit();
    }
  }

  if (status === 'fire' || status === 'poison') {
    creature.setState({ statusDuration: creature.statusDuration - 1 }).commit();

    if (creature.statusDuration !== 0) {
      const damage = Math.ceil(creature.hp * (20 / 100));
      const effect = status === 'fire' ? 'burn' : 'poison';

      creature.setState({ hp: Math.max(creature.hp - damage, 0) }).commit();
      log(messages.CREATURE_STATUS_EFFECT_DAMAGE, [name, damage, effect]);
    }

    if (creature.statusDuration === 0) {
      creature.setState({ status: 'normal' }).commit();
    }
  }

  dispatch(CREATURE_UPDATE);
}
