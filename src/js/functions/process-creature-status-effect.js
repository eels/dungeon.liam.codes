import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { log } from 'functions/combat-log';
import { processCreatureDeath } from 'functions/process-creature-death';

const processCreatureStatusEffect = () => {
  const creature = Dungeon.store.state.creatures[0];
  const status = creature.store.state.status;

  if (status === 'normal') {
    return;
  }

  const statusDuration = creature.store.state.statusDuration - 1;

  if (['ice', 'electric'].indexOf(status) > -1) {
    creature.store.commit({ statusDuration: statusDuration });
    fire('CREATURE_UPDATE');

    if (statusDuration >= 0) {
      return;
    }

    creature.store.commit({ status: 'normal' });
    fire('CREATURE_UPDATE');
  }

  if (['fire', 'poision'].indexOf(status) > -1) {
    creature.store.commit({ statusDuration: statusDuration });
    fire('CREATURE_UPDATE');

    if (statusDuration >= 0) {
      const statusDamage = creature.store.state.hp - 2;

      log(`* << Enemy ${capitalize(creature.store.state.raw.name)} takes ${2} damage from its <div class="tm-c-log__keyword">${status === 'fire' ? 'burn' : 'poison'}</div>.`);

      if (statusDamage > 0) {
        creature.store.commit({ hp: statusDamage });
      } else {
        processCreatureDeath();
      }

      fire('CREATURE_UPDATE');
      return;
    }

    creature.store.commit({ status: 'normal' });
    fire('CREATURE_UPDATE');
  }
};

export { processCreatureStatusEffect }
