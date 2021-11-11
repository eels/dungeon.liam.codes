import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import dispatch from 'events/delegate/dispatch';
import extendStatusEffect from 'functions/extend-status-effect';
import getElementEffect from 'functions/get-element-effect';
import log from 'functions/combat-log';
import messages from 'data/messages';
import processPlayerArmorUpdate from 'functions/process-player-armor-update';
import { CREATURE_UPDATE, PLAYER_UPDATE_STATS } from 'events/events';

export default function applyCreatureEffects(data) {
  const creature = Dungeon.creatures[0];

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

    log(messages.CREATURE_EFFECT_DAMAGE, [creature.name, damage]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'heal') {
    creature.setState({ hp: Math.min(creature.hp + data.health, Player.maxHp) }).commit();

    log(messages.CREATURE_EFFECT_GAIN_HP, [creature.name, data.health]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'mana') {
    creature.setState({ mp: Math.min(creature.mp + data.mana, Player.maxMp) }).commit();

    log(messages.CREATURE_EFFECT_GAIN_MP, [creature.name, data.mana]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'protect') {
    creature.setState({ ad: data.durability, armor: data.armor, maxAd: data.durability }).commit();

    log(messages.CREATURE_EFFECT_GAIN_ARMOR, [creature.name, data.armor]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'burn') {
    const duration = extendStatusEffect(Player, 'burn', data.duration);

    Player.setState({ status: 'fire', statusDuration: duration }).commit();

    log(messages.CREATURE_EFFECT_APPLY_BURN, [creature.name, data.duration]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'freeze') {
    const duration = extendStatusEffect(Player, 'freeze', data.duration);

    Player.setState({ status: 'ice', statusDuration: duration }).commit();

    log(messages.CREATURE_EFFECT_APPLY_FREEZE, [creature.name, data.duration]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'paralyse') {
    const duration = extendStatusEffect(Player, 'freeze', data.duration);

    Player.setState({ status: 'electric', statusDuration: duration }).commit();

    log(messages.CREATURE_EFFECT_APPLY_PARALYSIS, [creature.name, data.duration]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'poison') {
    const duration = extendStatusEffect(Player, 'poison', data.duration);

    Player.setState({ status: 'poison', statusDuration: duration }).commit();

    log(messages.CREATURE_EFFECT_APPLY_POISON, [creature.name, data.duration]);
    dispatch(PLAYER_UPDATE_STATS);
  }
}
