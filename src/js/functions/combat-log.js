import { type } from 'utilities/type';

let combatQueue = [];
let combatProcessing = false;

const processCombatQueue = () => {
  setInterval(() => {
    if (combatProcessing) {
      return;
    }

    if (combatQueue.length === 0) {
      return;
    }

    combatProcessing = true;
    postCombatEntry(combatQueue[0]);
  }, 100);
};

const postCombatEntry = data => {

  console.log('pce', combatProcessing, combatQueue.length);

  const id = Math.round(Math.random() * (999999999 - 100000000) + 100000000);
  const combatEntry = document.createElement('div');
  combatEntry.classList.add('tm-c-log__entry');
  combatEntry.setAttribute('data-id', id);

  if (data.state === 'CREATURE_DEATH') {
    combatEntry.classList.add('tm-c-log__death');
  }

  document.querySelector('.tm-c-log__container').appendChild(combatEntry);
  type(`.tm-c-log__entry[data-id="${id}"]`, data.copy, () => {
    combatQueue = combatQueue.splice(0, 1);
    combatProcessing = false;
  });
};

const log = (copy, state = '') => {
  combatQueue.push({
    copy,
    state
  });
};

export { processCombatQueue, log };
