import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';
import { processPlayerDeath } from 'functions/process-player-death';

const applyCreatureEffect = data => {
  const creature = Dungeon.store.state.creatures[0];

  if (data.effect === 'burn') {
    Player.store.commit({ status: 'fire', statusDuration: Player.store.state.status === 'burn' ? Player.store.state.statusDuration + (data.duration + 1) : (data.duration + 1) });
    log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} inflicts a <div class="tm-c-log__keyword">burn</div> on you lasting ${data.duration} turns`);
    fire('PLAYER_UPDATE_STATS');
  }
};

export { applyCreatureEffect };
