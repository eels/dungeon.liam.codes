import Dungeon from 'instances/Dungeon';
import applyCreatureEffects from 'functions/apply-creature-effects';
import dispatch from 'events/delegate/dispatch';
import shuffle from 'utilities/shuffle';
import { CREATURE_UPDATE } from 'events/events';

export default function processCreatureSpecialAttack() {
  const creature = Dungeon.creatures[0];
  const creatureSpecialChance = Math.round(Math.random() * 100);
  const creatureMana = creature.mp;

  if (creature.raw.specials === undefined) {
    return false;
  }

  const availableSpecials = creature.raw.specials;
  const useableSpecials = [];

  for (const special of availableSpecials) {
    if (creatureSpecialChance >= 100 - special.chance) {
      useableSpecials.push(special);
    }
  }

  if (useableSpecials.length === 0) {
    return false;
  }

  const selectedSpecial = shuffle(useableSpecials)[0];
  const selectedSpecialCost = selectedSpecial.cost !== undefined ? selectedSpecial.cost : 0;

  if (creatureMana - selectedSpecialCost < 0) {
    return false;
  }

  creature.setState({ mp: creatureMana - selectedSpecialCost }).commit();

  dispatch(CREATURE_UPDATE);
  applyCreatureEffects(selectedSpecial);

  return true;
}
