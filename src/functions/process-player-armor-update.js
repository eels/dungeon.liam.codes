import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { PLAYER_UPDATE_STATS } from 'events/events';

export default function processPlayerArmorUpdate(damage) {
  const creature = Dungeon.creatures[0];

  if (Player.ad === 0) {
    return;
  }

  Player.setState({ ad: Math.max(Player.ad - damage, 0) }).commit();

  if (Player.ad === 0) {
    Player.setState({ armor: 0, maxAd: 0 }).commit();
    log(messages.CREATURE_EFFECT_BREAK_CREATURE_ARMOR, [creature.name]);
  }

  dispatch(PLAYER_UPDATE_STATS);
}
