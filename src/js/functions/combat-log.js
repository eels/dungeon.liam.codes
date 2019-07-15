import { on, fire } from 'utilities/delegation';
import { type } from 'utilities/type';

const combatQueue = [];

const log = (copy, state = '') => {
  combatQueue.push([copy, state]);
  fire('COMBAT_QUEUE_UPDATE');
};

export { log };

/*

const id = Math.round(Math.random() * (999999999 - 100000000) + 100000000);
const combatEntry = document.createElement('div');
combatEntry.classList.add('tm-c-log__entry');
combatEntry.setAttribute('data-id', id);

if (state === 'CREATURE_DEATH') {
  combatEntry.classList.add('tm-c-log__death');
}

document.querySelector('.tm-c-log__container').appendChild(combatEntry);

type(`.tm-c-log__entry[data-id="${id}"]`, copy);

*/
