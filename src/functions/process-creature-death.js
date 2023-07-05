import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureDeath() {
  const creature = Dungeon.creatures[0];

  Player.setState({ gold: Player.gold + creature.raw.gold }).commit();
  Player.setState({ totalGold: Player.totalGold + creature.raw.gold }).commit();
  Player.setState({ kills: Player.kills + 1 }).commit();

  const board = document.querySelector('.tm-c-board');

  setTimeout(() => board.classList.add('tm-c-board--hit'), 0);
  setTimeout(() => board.classList.remove('tm-c-board--hit'), 200);

  Dungeon.advance();

  log(messages.CREATURE_DEATH_CALL, [creature.name], 'CREATURE_DEATH');
  log(messages.CREATURE_DEATH_REWARD, [creature.raw.gold]);
  log(messages.PLAYER_ADVANCE_ENCOUNTER, [Dungeon.creatures[0].name]);
  dispatch(CREATURE_UPDATE);
}
