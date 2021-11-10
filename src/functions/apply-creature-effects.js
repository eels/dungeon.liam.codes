import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import extendStatusEffect from 'functions/extend-status-effect';
import getElementEffect from 'functions/get-element-effect';
import log from 'functions/combat-log';
import processPlayerArmorUpdate from 'functions/process-player-armor-update';
import { CREATURE_UPDATE, PLAYER_UPDATE_STATS } from 'events/events';

export default function applyCreatureEffects(data) {
  const creature = Dungeon.creatures[0];
  const name = capitalize(creature.raw.name);

  if (data.effect === 'damage') {
    const damageCalculation = Player.armor - data.damage;
    const isHit = damageCalculation < 0;
    const damage = Math.abs(damageCalculation);

    processPlayerArmorUpdate(damage);

    if (data.element && ['electric', 'fire', 'ice', 'poison'].includes(data.element)) {
      const chance = Math.round(Math.random() * 10);

      if (chance > 7 && Player.status === 'normal') {
        applyCreatureEffects({ duration: 2, effect: getElementEffect(data.element) });
      }
    }

    if (isHit) {
      Player.setState({ hp: Math.max(Player.hp - damage, 0) }).commit();
    }

    log(`* >> Enemy ${name} hits you for ${damage} damage`);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'heal') {
    creature.setState({ hp: Math.min(creature.hp + data.health, Player.maxHp) }).commit();

    log(`* >> Enemy ${name} restores ${data.health} <div class="tm-c-log__keyword">hp</div>`);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'mana') {
    creature.setState({ mp: Math.min(creature.mp + data.mana, Player.maxMp) }).commit();

    log(`* >> Enemy ${name} restores ${data.health} <div class="tm-c-log__keyword">mp</div>`);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'protect') {
    creature.setState({ ad: data.durability, armor: data.armor, maxAd: data.durability }).commit();

    log(`* >> Enemy ${name} gains ${data.armor} <div class="tm-c-log__keyword">armor</div>`);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'burn') {
    const duration = extendStatusEffect(Player, 'burn', data.duration);

    Player.setState({ status: 'fire', statusDuration: duration }).commit();

    log(
      `* >> Enemy ${name} inflicts a <div class="tm-c-log__keyword">burn</div> on you lasting ${data.duration} turns`,
    );
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'poison') {
    const duration = extendStatusEffect(Player, 'poison', data.duration);

    Player.setState({ status: 'poison', statusDuration: duration }).commit();

    log(
      `* >> Enemy ${name} inflicts <div class="tm-c-log__keyword">poison</div> on you lasting ${data.duration} turns`,
    );
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'freeze') {
    const duration = extendStatusEffect(Player, 'freeze', data.duration);

    Player.setState({ status: 'ice', statusDuration: duration }).commit();

    log(
      `* >> Enemy ${name} <div class="tm-c-log__keyword">freezes</div> your body lasting ${data.duration} turns`,
    );
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'paralyse') {
    const duration = extendStatusEffect(Player, 'freeze', data.duration);

    Player.setState({ status: 'electric', statusDuration: duration }).commit();

    log(
      `* >> Enemy ${name} <div class="tm-c-log__keyword">paralyses</div> your body lasting ${data.duration} turns`,
    );
    dispatch(PLAYER_UPDATE_STATS);
  }
}
