import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import processCreatureSpecialAttack from 'functions/process-creature-special-attack';
import processPlayerArmorUpdate from 'functions/process-player-armor-update';
import { PLAYER_UPDATE_STATS } from 'events/events';

export default function processCreatureAttack() {
  const creature = Dungeon.creatures[0];
  const hasCreatureUsedSpecialAttack = processCreatureSpecialAttack();

  if (hasCreatureUsedSpecialAttack) {
    return;
  }

  const damageCalculation = Player.armor - creature.raw.attack;
  const isHit = damageCalculation < 0;
  const damage = Math.abs(damageCalculation);

  processPlayerArmorUpdate(creature.raw.attack);

  if (isHit) {
    Player.setState({ hp: Math.max(Player.hp - damage, 0) }).commit();
  }

  log(messages.CREATURE_EFFECT_DAMAGE, [creature.name, damage]);
  dispatch(PLAYER_UPDATE_STATS);
}
