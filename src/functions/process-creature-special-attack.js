import Dungeon from 'instances/Dungeon';
import applyCreatureEffects from 'functions/apply-creature-effects';
import chance from 'utilities/chance';
import dispatch from 'events/delegate/dispatch';
import shuffle from 'utilities/shuffle';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureSpecialAttack() {
  const creature = Dungeon.creatures[0];

  if (creature.raw.specials === undefined) {
    return false;
  }

  const useableSpecials = creature.raw.specials.reduce((specials, special) => {
    if (chance(special.chance)) {
      specials.push(special);
    }

    return specials;
  }, []);

  if (useableSpecials.length === 0) {
    return false;
  }

  const selectedSpecial = shuffle(useableSpecials)[0];
  const selectedSpecialCost = selectedSpecial.cost !== undefined ? selectedSpecial.cost : 0;

  if (creature.mp - selectedSpecialCost < 0) {
    return false;
  }

  creature.setState({ mp: creature.mp - selectedSpecialCost }).commit();

  dispatch(CREATURE_UPDATE);
  applyCreatureEffects(selectedSpecial);

  return true;
}
