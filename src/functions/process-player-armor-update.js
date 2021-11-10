import Player from 'instances/Player';
import dispatch from 'events/delegate/dispatch';
import { PLAYER_UPDATE_STATS } from 'events/events';

export default function processPlayerArmorUpdate(damage) {
  if (Player.ad === 0) {
    return;
  }

  Player.setState({ ad: Math.max(Player.ad - damage, 0) }).commit();

  if (Player.ad === 0) {
    Player.setState({ armor: 0, maxAd: 0 }).commit();
  }

  dispatch(PLAYER_UPDATE_STATS);
}
