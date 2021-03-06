import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import chance from 'utilities/chance';
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
    const damageCalculation = Player.armor - data.damage * creature.statModifier;
    const isHit = damageCalculation < 0;
    const damage = Math.abs(damageCalculation);
    const message = data.message ?? messages.CREATURE_EFFECT_DAMAGE;

    processPlayerArmorUpdate(data.damage * creature.statModifier);

    if (data.element && ['electric', 'fire', 'ice', 'poison'].includes(data.element)) {
      if (chance(0.3) && Player.status === 'normal') {
        applyCreatureEffects({ duration: 2, effect: getElementEffect(data.element) });
      }
    }

    if (isHit) {
      Player.setState({ hp: Math.max(Player.hp - damage, 0) }).commit();
    }

    log(message, [creature.name, damage]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'heal') {
    const effect = data.health * creature.statModifier;
    const message = data.message ?? messages.CREATURE_EFFECT_GAIN_HP;

    creature.setState({ hp: Math.min(creature.hp + effect, Player.maxHp) }).commit();

    log(message, [creature.name, effect]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'mana') {
    const effect = data.mana * creature.statModifier;
    const message = data.message ?? messages.CREATURE_EFFECT_GAIN_MP;

    creature.setState({ mp: Math.min(creature.mp + effect, Player.maxMp) }).commit();

    log(message, [creature.name, effect]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'protect') {
    const effect = data.armor * creature.statModifier;
    const message = data.message ?? messages.CREATURE_EFFECT_GAIN_ARMOR;

    creature.setState({ ad: effect, armor: effect, maxAd: effect }).commit();

    log(message, [creature.name, effect]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'burn') {
    const effect = data.duration * creature.statModifier;
    const duration = extendStatusEffect(Player, 'burn', effect);
    const message = data.message ?? messages.CREATURE_EFFECT_APPLY_BURN;

    Player.setState({ status: 'fire', statusDuration: duration }).commit();

    log(message, [creature.name, effect]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'freeze') {
    const effect = data.duration * creature.statModifier;
    const duration = extendStatusEffect(Player, 'freeze', effect);
    const message = data.message ?? messages.CREATURE_EFFECT_APPLY_FREEZE;

    Player.setState({ status: 'ice', statusDuration: duration }).commit();

    log(message, [creature.name, effect]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'paralyse') {
    const effect = data.duration * creature.statModifier;
    const duration = extendStatusEffect(Player, 'freeze', effect);
    const message = data.message ?? messages.CREATURE_EFFECT_APPLY_PARALYSIS;

    Player.setState({ status: 'electric', statusDuration: duration }).commit();

    log(message, [creature.name, effect]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'poison') {
    const effect = data.duration * creature.statModifier;
    const duration = extendStatusEffect(Player, 'poison', effect);
    const message = data.message ?? messages.CREATURE_EFFECT_APPLY_POISON;

    Player.setState({ status: 'poison', statusDuration: duration }).commit();

    log(message, [creature.name, effect]);
    dispatch(PLAYER_UPDATE_STATS);
  }
}
