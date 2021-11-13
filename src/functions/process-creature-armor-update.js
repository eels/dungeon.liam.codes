import Dungeon from 'instances/Dungeon';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureArmorUpdate(damage) {
  const creature = Dungeon.creatures[0];

  if (creature.ad === 0) {
    return;
  }

  creature.setState({ ad: Math.max(creature.ad - damage, 0) }).commit();

  if (creature.ad === 0) {
    creature.setState({ armor: 0, maxAd: 0 }).commit();
    log(messages.PLAYER_CARD_EFFECT_BREAK_CREATURE_ARMOR, [creature.name]);
  }

  dispatch(CREATURE_UPDATE);
}
