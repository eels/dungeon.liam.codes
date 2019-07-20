import { capitalize } from 'utilities/capitalize';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { log } from 'functions/combat-log';

const processCreatureDeath = () => {
  const creature = Dungeon.store.state.creatures[0];
  Player.store.commit({ gold: Player.store.state.gold + creature.store.state.raw.gold, totalGold: Player.store.state.totalGold + creature.store.state.raw.gold });
  Player.store.commit({ kills: Player.store.state.kills + 1 });
  Dungeon.advance();
  log(`* >> Enemy ${capitalize(creature.store.state.raw.name)} succumbs to its wounds and perishes`, 'CREATURE_DEATH');
  log(`* << You recieve ${creature.store.state.raw.gold} <div class="tm-c-log__keyword">gold</div>`);
};

export { processCreatureDeath };
