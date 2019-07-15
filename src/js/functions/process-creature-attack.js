import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';
import { processPlayerDeath } from 'functions/process-player-death';

const processCreatureAttack = () => {
  const playerHealth = Player.store.state.hp;
  const playerArmor = Player.store.state.armor;
  const creature = Dungeon.store.state.creatures[0];
  const creatureAttack = creature.store.state.raw.attack;
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
  log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} hits you for ${creatureAttack} damage`);

  if (hit <= 0) {
    processPlayerDeath();
  }
};

export { processCreatureAttack };
