import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import chance from 'utilities/chance';
import dispatch from 'events/delegate/dispatch';
import extendStatusEffect from 'functions/extend-status-effect';
import getElementEffect from 'functions/get-element-effect';
import log from 'functions/combat-log';
import messages from 'data/messages';
import processCreatureArmorUpdate from 'functions/process-creature-armor-update';
import processCreatureDeath from 'functions/process-creature-death';
import shuffle from 'utilities/shuffle';
import { CREATURE_UPDATE, PLAYER_UPDATE_HAND, PLAYER_UPDATE_STATS } from 'events/events';

export default function applyCardEffects(data) {
  if (data.effect === 'armor') {
    Player.setState({ armor: data.armor }).commit();
    Player.setState({ ad: data.armor, maxAd: data.armor }).commit();

    log(messages.PLAYER_CARD_EFFECT_GAIN_ARMOR, [data.armor]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'cure') {
    Player.setState({ status: 'normal', statusDuration: 0 }).commit();

    log(messages.PLAYER_CARD_EFFECT_CURE, []);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'heal') {
    Player.setState({ hp: Math.min(Player.hp + data.health, Player.maxHp) }).commit();

    log(messages.PLAYER_CARD_EFFECT_GAIN_HP, [data.health]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'mana') {
    Player.setState({ mp: Math.min(Player.mp + data.mana, Player.maxMp) }).commit();

    log(messages.PLAYER_CARD_EFFECT_GAIN_MP, [data.mana]);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'damage') {
    const creature = Dungeon.creatures[0];
    const isCrit = creature.raw.weakness && data.element && creature.raw.weakness === data.element;
    const damageCalculation = creature.armor - data.damage * (isCrit ? 2 : 1);
    const isHit = damageCalculation < 0;
    const damage = Math.abs(damageCalculation);

    processCreatureArmorUpdate(data.damage * (isCrit ? 2 : 1));

    if (data.element && ['electric', 'fire', 'ice', 'poison'].includes(data.element)) {
      if (chance(0.3) && creature.status === 'normal') {
        applyCardEffects({ duration: 2, effect: getElementEffect(data.element) });
      }
    }

    if (isHit) {
      creature.setState({ hp: Math.max(creature.hp - damage, 0) }).commit();
    }

    log(messages.PLAYER_CARD_EFFECT_DAMAGE, [creature.name, damage]);
    dispatch(CREATURE_UPDATE);
    dispatch(PLAYER_UPDATE_STATS);

    if (creature.hp === 0) {
      processCreatureDeath();
    }
  }

  if (data.effect === 're-draw') {
    Player.setState({ deck: shuffle(Player.deck) }).commit();

    log(messages.PLAYER_CARD_EFFECT_REDRAW, []);
    dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });
  }

  if (data.effect === 'burn') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'burn', data.duration);

    creature.setState({ status: 'fire', statusDuration: duration }).commit();

    log(messages.PLAYER_CARD_EFFECT_APPLY_BURN, [creature.name, data.duration]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'freeze') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'freeze', data.duration);

    creature.setState({ status: 'ice', statusDuration: duration }).commit();

    log(messages.PLAYER_CARD_EFFECT_APPLY_FREEZE, [creature.name, data.duration]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'paralyse') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'paralyse', data.duration);

    creature.setState({ status: 'electric', statusDuration: duration }).commit();

    log(messages.PLAYER_CARD_EFFECT_APPLY_PARALYSIS, [creature.name, data.duration]);
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'poison') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'poison', data.duration);

    creature.setState({ status: 'poison', statusDuration: duration }).commit();

    log(messages.PLAYER_CARD_EFFECT_APPLY_POISON, [creature.name, data.duration]);
    dispatch(CREATURE_UPDATE);
  }
}
