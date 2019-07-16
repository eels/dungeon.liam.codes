import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';
import { processPlayerDeath } from 'functions/process-player-death';

const applyCreatureEffect = data => {
  const creature = Dungeon.store.state.creatures[0];

  if (data.effect === 'damage') {
    const playerHealth = Player.store.state.hp;
    const playerArmor = Player.store.state.armor;
    const creatureAttack = data.damage;
    let hit = playerHealth - (playerArmor - creatureAttack > 0 ? 0 : (playerArmor - creatureAttack) * -1);

    if (Player.store.state.ad > 0) {
      const playerDurability = Player.store.state.ad - creatureAttack;
      Player.store.commit({ ad: playerDurability > 0 ? playerDurability : 0 });

      if (playerDurability <= 0) {
        Player.store.commit({ armor: 0, maxAd: 0 });
        hit = hit - (playerDurability * -1);
      }
    }

    Player.store.commit({ hp: hit > 0 ? hit : 0 });
    fire('PLAYER_UPDATE_STATS');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} hits you for ${data.damage} damage`);
    }

    if (hit <= 0) {
      processPlayerDeath();
    }
  }

  if (data.effect === 'heal') {
    creature.store.commit({ hp: creature.store.state.hp + data.health > creature.store.state.maxHp ? creature.store.state.maxHp : creature.store.state.hp + data.health });
    fire('CREATURE_UPDATE');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} restores ${data.health} <div class="tm-c-log__keyword">hp</div>`);
    }
  }

  if (data.effect === 'mana') {
    creature.store.commit({ mp: creature.store.state.mp + data.mana > creature.store.state.maxMp ? creature.store.state.maxMp : creature.store.state.mp + data.mana });
    fire('CREATURE_UPDATE');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} restores ${data.mana} <div class="tm-c-log__keyword">mp</div>`);
    }
  }

  if (data.effect === 'protect') {
    creature.store.commit({ armor: data.armor, ad: data.durability, maxAd: data.durability });
    fire('CREATURE_UPDATE');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} gains ${data.armor} <div class="tm-c-log__keyword">armor</div>`);
    }
  }

  if (data.effect === 'burn') {
    Player.store.commit({ status: 'fire', statusDuration: Player.store.state.status === 'burn' ? Player.store.state.statusDuration + (data.duration + 1) : (data.duration + 1) });
    fire('PLAYER_UPDATE_STATS');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} inflicts a <div class="tm-c-log__keyword">burn</div> on you lasting ${data.duration} turns`);
    }
  }

  if (data.effect === 'poison') {
    Player.store.commit({ status: 'poison', statusDuration: Player.store.state.status === 'poison' ? Player.store.state.statusDuration + (data.duration + 1) : (data.duration + 1) });
    fire('PLAYER_UPDATE_STATS');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} inflicts <div class="tm-c-log__keyword">poison</div> on you lasting ${data.duration} turns`);
    }
  }

  if (data.effect === 'freeze') {
    Player.store.commit({ status: 'ice', statusDuration: Player.store.state.status === 'ice' ? Player.store.state.statusDuration + (data.duration + 1) : (data.duration + 1) });
    fire('PLAYER_UPDATE_STATS');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} <div class="tm-c-log__keyword">freezes</div> your body lasting ${data.duration} turns`);
    }
  }

  if (data.effect === 'paralyse') {
    Player.store.commit({ status: 'electric', statusDuration: Player.store.state.status === 'electric' ? Player.store.state.statusDuration + (data.duration + 1) : (data.duration + 1) });
    fire('PLAYER_UPDATE_STATS');

    if (data.message !== undefined) {
      log(data.message.replace('*name*', capitalize(creature.store.state.raw.name)).replace('*damage*', data.damage));
    } else {
      log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} <div class="tm-c-log__keyword">paralyses</div> your body lasting ${data.duration} turns`);
    }
  }
};

export { applyCreatureEffect };
