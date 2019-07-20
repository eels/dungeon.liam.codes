import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { log } from 'functions/combat-log';
import { processCreatureAttack } from 'functions/process-creature-attack';
import { processCreatureDeath } from 'functions/process-creature-death';

const processCreatureStatusEffect = () => {
  const creature = Dungeon.store.state.creatures[0];
  const status = creature.store.state.status;

  if (['ice', 'electric'].indexOf(status) > -1) {
    const statusDuration = creature.store.state.statusDuration - 1;
    creature.store.commit({ statusDuration: statusDuration });
    fire('CREATURE_UPDATE');

    if (statusDuration >= 0) {
      return;
    }

    creature.store.commit({ status: 'normal' });
    fire('CREATURE_UPDATE');
    processCreatureAttack();
    return;
  }

  if (['fire', 'poison'].indexOf(status) > -1) {
    const statusDuration = creature.store.state.statusDuration - 1;
    creature.store.commit({ statusDuration: statusDuration });
    fire('CREATURE_UPDATE');

    if (statusDuration >= 0) {
      const percentageDamage = Math.ceil(creature.store.state.maxHp * (20 / 100));
      const statusDamage = creature.store.state.hp - percentageDamage;

      log(`* << Enemy ${capitalize(creature.store.state.raw.name)} takes ${percentageDamage} damage from its <div class="tm-c-log__keyword">${status === 'fire' ? 'burn' : 'poison'}</div>`);

      if (statusDamage > 0) {
        creature.store.commit({ hp: statusDamage });
      } else {
        processCreatureDeath();
        fire('CREATURE_UPDATE');
        fire('PLAYER_UPDATE_STATS');
        return;
      }

      fire('CREATURE_UPDATE');
      processCreatureAttack();
      return;
    }

    creature.store.commit({ status: 'normal' });
    fire('CREATURE_UPDATE');
    processCreatureAttack();
    return;
  }

  processCreatureAttack();
};

export { processCreatureStatusEffect }
