import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import extendStatusEffect from 'functions/extend-status-effect';
import getElementEffect from 'functions/get-element-effect';
import log from 'functions/combat-log';
import processCreatureArmorUpdate from 'functions/process-creature-armor-update';
import processCreatureDeath from 'functions/process-creature-death';
import shuffle from 'utilities/shuffle';
import { CREATURE_UPDATE, PLAYER_UPDATE_STATS } from 'events/events';

export default function applyCardEffects(data) {
  if (data.effect === 'armor') {
    Player.setState({ ad: data.durability, armor: data.armor, maxAd: data.durability }).commit();
    log(
      `* << You gain ${data.armor} <div class="tm-c-log__keyword">armor</div> from your equipment`,
    );
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'cure') {
    Player.setState({ status: 'normal', statusDuration: 0 }).commit();

    log('* << You cure yourself of all <div class="tm-c-log__keyword">status effects</div>');
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'heal') {
    const hp = Player.hp + data.health;

    Player.setState({ hp: Math.min(hp, Player.maxHp) }).commit();

    log(`* << You restore ${data.health} <div class="tm-c-log__keyword">HP</div>`);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'mana') {
    const mp = Player.mp + data.mana;

    Player.setState({ mp: Math.min(mp, Player.maxMp) }).commit();

    log(`* << You restore ${data.mana} <div class="tm-c-log__keyword">MP</div>`);
    dispatch(PLAYER_UPDATE_STATS);
  }

  if (data.effect === 'damage') {
    const creature = Dungeon.creatures[0];
    const isCrit = creature.raw.weakness && data.element && creature.raw.weakness === data.element;
    const damageCalculation = creature.armor - data.damage * (isCrit ? 2 : 1);
    const isHit = damageCalculation < 0;
    const damage = Math.abs(damageCalculation);

    if (creature.raw.resistance && data.element) {
      if (creature.raw.resistance === data.element) {
        return log(`* << Enemy ${capitalize(creature.raw.name)} resists your attack`);
      }
    }

    processCreatureArmorUpdate(damage);

    if (data.element && ['electric', 'fire', 'ice', 'poison'].includes(data.element)) {
      const chance = Math.round(Math.random() * 10);

      if (chance > 7 && creature.status === 'normal') {
        applyCardEffects({ duration: 2, effect: getElementEffect(data.element) });
      }
    }

    if (isHit) {
      creature.setState({ hp: Math.max(creature.hp - damage, 0) }).commit();
    }

    log(`* << Your attack on enemy ${capitalize(creature.raw.name)} lands for ${damage} damage`);
    dispatch(CREATURE_UPDATE);
    dispatch(PLAYER_UPDATE_STATS);

    if (creature.hp === 0) {
      processCreatureDeath();
    }
  }

  if (data.effect === 're-draw') {
    Player.setState({ deck: shuffle(Player.deck) }).commit();
  }

  if (data.effect === 'burn') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'burn', data.duration);

    creature.setState({ status: 'fire', statusDuration: duration }).commit();

    log(
      `* << You <div class="tm-c-log__keyword">burn</div> enemy ${capitalize(
        creature.raw.name,
      )} for ${data.duration} turns`,
    );
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'poison') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'poison', data.duration);

    creature.setState({ status: 'poison', statusDuration: duration }).commit();

    log(
      `* << You <div class="tm-c-log__keyword">poison</div> enemy ${capitalize(
        creature.raw.name,
      )} for ${data.duration} turns`,
    );
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'freeze') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'freeze', data.duration);

    creature.setState({ status: 'ice', statusDuration: duration }).commit();

    log(
      `* << You <div class="tm-c-log__keyword">freeze</div> enemy ${capitalize(
        creature.raw.name,
      )} for ${data.duration} turns`,
    );
    dispatch(CREATURE_UPDATE);
  }

  if (data.effect === 'paralyse') {
    const creature = Dungeon.creatures[0];
    const duration = extendStatusEffect(creature, 'paralyse', data.duration);

    creature.setState({ status: 'electric', statusDuration: duration }).commit();

    log(
      `* << You <div class="tm-c-log__keyword">paralyse</div> enemy ${capitalize(
        creature.raw.name,
      )} for ${data.duration} turns`,
    );
    dispatch(CREATURE_UPDATE);
  }
}
