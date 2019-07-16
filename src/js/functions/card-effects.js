import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';
import { processCreatureDeath } from 'functions/process-creature-death';

const applyCardEffect = data => {
  if (data.effect === 'heal') {
    const hp = Player.store.state.hp + data.health;
    const maxHp = Player.store.state.maxHp;
    Player.store.commit({ hp: hp > maxHp ? maxHp : hp });
    log(`* << You restore ${data.health} <div class="tm-c-log__keyword">HP</div>`);
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 'mana') {
    const mp = Player.store.state.mp + data.mana;
    const maxMp = Player.store.state.maxMp;
    Player.store.commit({ mp: mp > maxMp ? maxMp : mp });
    log(`* << You restore ${data.mana} <div class="tm-c-log__keyword">MP</div>`);
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 'cure') {
    Player.store.commit({ status: 'normal', statusDuration: 0 });
    log(`* << You cure yourself of all <div class="tm-c-log__keyword">status effects</div>`);
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 'damage') {
    const creature = Dungeon.store.state.creatures[0];
    const creatureHealth = creature.store.state.hp;
    const creatureArmor = creature.store.state.armor;
    let damage = data.damage;

    if (creature.store.state.raw.weakness && data.element) {
      if (creature.store.state.raw.weakness === data.element) {
        damage = damage * 2;
      }
    }

    let hit = creatureHealth - (creatureArmor - damage > 0 ? 0 : (creatureArmor - damage) * -1);

    if (creature.store.state.ad > 0) {
      const creatureDurability = creature.store.state.ad - damage;
      creature.store.commit({ ad: creatureDurability > 0 ? creatureDurability : 0 });

      if (creatureDurability <= 0) {
        creature.store.commit({ armor: 0, maxAd: 0 });
        hit = hit - (creatureDurability * -1);
      }
    }

    if (data.element && ['electric', 'fire', 'ice', 'poison'].indexOf(data.element) > -1) {
      const chance = Math.round(Math.random() * 10);
      if (chance > 7 && creature.store.state.status === 'normal') {
        creature.store.commit({ status: data.element, statusDuration: 2 });
      }
    }

    log(`* << Your attack on enemy ${capitalize(creature.store.state.raw.name)} lands for ${damage} damage`);

    if (hit > 0) {
      creature.store.commit({ hp: hit });
    } else {
      processCreatureDeath();
    }

    fire('CREATURE_UPDATE');
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 're-draw') {
    const deck = Player.store.state.deck;
    const shuffled = deck.splice(0, 5);
    shuffled.forEach(card => deck.push(card));
    Player.store.commit({ deck: deck });
  }

  if (data.effect === 'armor') {
    Player.store.commit({ armor: data.armor, ad: data.durability, maxAd: data.durability });
    log(`* << You gain ${data.armor} <div class="tm-c-log__keyword">armor</div> from your equipment`);
    fire('PLAYER_UPDATE_STATS');
  }

  if (data.effect === 'burn') {
    const creature = Dungeon.store.state.creatures[0];
    creature.store.commit({ status: 'fire', statusDuration: creature.store.state.status === 'burn' ? creature.store.state.statusDuration + data.duration : data.duration });
    log(`* << You <div class="tm-c-log__keyword">burn</div> enemy ${capitalize(creature.store.state.raw.name)} for ${data.duration} turns`);
    fire('CREATURE_UPDATE');
  }

  if (data.effect === 'poison') {
    const creature = Dungeon.store.state.creatures[0];
    creature.store.commit({ status: 'poison', statusDuration: creature.store.state.status === 'poison' ? creature.store.state.statusDuration + data.duration : data.duration });
    log(`* << You <div class="tm-c-log__keyword">poison</div> enemy ${capitalize(creature.store.state.raw.name)} for ${data.duration} turns`);
    fire('CREATURE_UPDATE');
  }

  if (data.effect === 'freeze') {
    const creature = Dungeon.store.state.creatures[0];
    creature.store.commit({ status: 'ice', statusDuration: creature.store.state.status === 'ice' ? creature.store.state.statusDuration + data.duration : data.duration });
    log(`* << You <div class="tm-c-log__keyword">freeze</div> enemy ${capitalize(creature.store.state.raw.name)} for ${data.duration} turns`);
    fire('CREATURE_UPDATE');
  }

  if (data.effect === 'paralyse') {
    const creature = Dungeon.store.state.creatures[0];
    creature.store.commit({ status: 'electric', statusDuration: creature.store.state.status === 'electric' ? creature.store.state.statusDuration + data.duration : data.duration });
    log(`* << You <div class="tm-c-log__keyword">paralyse</div> enemy ${capitalize(creature.store.state.raw.name)} for ${data.duration} turns`);
    fire('CREATURE_UPDATE');
  }
};

export { applyCardEffect };
