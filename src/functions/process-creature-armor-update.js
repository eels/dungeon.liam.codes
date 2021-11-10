import Dungeon from 'instances/Dungeon';
import dispatch from 'events/delegate/dispatch';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureArmorUpdate(damage) {
  const creature = Dungeon.creatures[0];

  if (creature.ad === 0) {
    return;
  }

  creature.setState({ ad: Math.max(creature.ad - damage, 0) }).commit();

  if (creature.ad === 0) {
    creature.setState({ armor: 0, maxAd: 0 }).commit();
  }

  dispatch(CREATURE_UPDATE);
}
