import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureDeath() {
  const creature = Dungeon.creatures[0].raw;

  Player.setState({ gold: Player.gold + creature.gold }).commit();
  Player.setState({ totalGold: Player.totalGold + creature.gold }).commit();
  Player.setState({ kills: Player.kills + 1 }).commit();

  Dungeon.advance();
  dispatch(CREATURE_UPDATE);

  log(
    `* >> Enemy ${capitalize(creature.name)} succumbs to its wounds and perishes`,
    'CREATURE_DEATH',
  );
  log(`* << You recieve ${creature.gold} <div class="tm-c-log__keyword">gold</div>`);
}
