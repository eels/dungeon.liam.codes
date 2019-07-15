import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';
import { processCreatureDeath } from 'functions/process-creature-death';

const applyCardEffect = (data) => {
  if (data.effect === 'health potion') {
    const hp = Player.store.state.hp + data.health;
    const maxHp = Player.store.state.maxHp;
    Player.store.commit({ hp: hp > maxHp ? maxHp : hp });
    log(`* << You restore ${data.health} HP.`);
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 'mana potion') {
    const mp = Player.store.state.mp + data.mana;
    const maxMp = Player.store.state.maxMp;
    Player.store.commit({ mp: mp > maxMp ? maxMp : mp });
    log(`* << You restore ${data.mana} MP.`);
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 'damage') {
    const creature = Dungeon.store.state.creatures[0];
    let damage = data.damage;

    if (creature.store.state.raw.weakness && data.element) {
      if (creature.store.state.raw.weakness === data.element) {
        damage = damage * 2;
      }
    }

    const hit = creature.store.state.hp - damage;

    if (data.element && ['electric', 'fire', 'ice', 'poison'].indexOf(data.element) > -1) {
      const chance = Math.round(Math.random() * 10);
      if (chance > 7 && creature.store.state.status === 'normal') {
        creature.store.commit({ status: data.element, statusDuration: 2 });
      }
    }

    log(`* << Your attack on enemy ${capitalize(creature.store.state.raw.name)} lands for ${damage} damage.`);

    if (hit > 0) {
      creature.store.commit({ hp: hit });
    } else {
      processCreatureDeath();
    }

    fire('CREATURE_UPDATE');
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 'freeze') {
    const creature = Dungeon.store.state.creatures[0];
    creature.store.commit({ status: 'ice', statusDuration: creature.store.state.status === 'ice' ? creature.store.state.statusDuration + data.duration : data.duration });
    log(`* << You <div class="tm-c-log__keyword">freeze</div> enemy ${capitalize(creature.store.state.raw.name)} for ${creature.store.state.statusDuration} turns.`);
    fire('CREATURE_UPDATE');
  }

  if (data.effect === 'shuffle') {
    const deck = Player.store.state.deck;
    const shuffled = deck.splice(0, 5);
    shuffled.forEach(card => deck.push(card));
    Player.store.commit({ deck: deck });
  }

  if (data.effect === 'armor') {
    Player.store.commit({ armor: data.armor, ad: data.durability, maxAd: data.durability });
    fire('PLAYER_UPDATE_STATS');
  }
};

export { applyCardEffect };
