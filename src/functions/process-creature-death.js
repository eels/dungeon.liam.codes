import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureDeath() {
  const creature = Dungeon.creatures[0].raw;
  const name = capitalize(creature.name);

  Player.setState({ gold: Player.gold + creature.gold }).commit();
  Player.setState({ totalGold: Player.totalGold + creature.gold }).commit();
  Player.setState({ kills: Player.kills + 1 }).commit();

  Dungeon.advance();

  log(messages.CREATURE_DEATH_CALL, [name], 'CREATURE_DEATH');
  log(messages.CREATURE_DEATH_REWARD, [creature.gold]);
  dispatch(CREATURE_UPDATE);
}
