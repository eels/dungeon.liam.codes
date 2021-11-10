import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import processCreatureSpecialAttack from 'functions/process-creature-special-attack';
import processPlayerArmorUpdate from 'functions/process-player-armor-update';
import { PLAYER_UPDATE_STATS } from 'events/events';

export default function processCreatureAttack() {
  const creature = Dungeon.creatures[0];
  const creatureAttack = creature.raw.attack;
  const hasCreatureUsedSpecialAttack = processCreatureSpecialAttack();

  if (hasCreatureUsedSpecialAttack) {
    return;
  }

  const damageCalculation = Player.armor - creatureAttack;
  const isHit = damageCalculation < 0;
  const damage = Math.abs(damageCalculation);

  processPlayerArmorUpdate(damage);

  if (isHit) {
    Player.setState({ hp: Math.max(Player.hp - damage, 0) }).commit();
  }

  dispatch(PLAYER_UPDATE_STATS);
  log(`* >> Enemy ${capitalize(creature.raw.name)} hits you for ${damage} damage`);
}
