import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';
import { processPlayerDeath } from 'functions/process-player-death';

const processCreatureAttack = () => {
  const playerHealth = Player.store.state.hp;
  const creature = Dungeon.store.state.creatures[0];
  const creatureAttack = creature.store.state.raw.attack;
  const hit = playerHealth - creatureAttack;

  Player.store.commit({ hp: hit > 0 ? hit : 0 });
  fire('PLAYER_UPDATE_STATS');
  log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} hits you for ${creatureAttack} damage.`);

  if (hit <= 0) {
    processPlayerDeath();
  }
};

export { processCreatureAttack };
