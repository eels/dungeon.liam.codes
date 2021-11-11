import hydrate from 'utilities/hydrate';
import type from 'utilities/type';
import uuid from 'utilities/uuid';

export const combatQueueItems = [];
export let combatQueue = null;
export let isCombatQueueProcessing = false;

export default function processCombatQueue() {
  combatQueue = setInterval(() => {
    if (isCombatQueueProcessing === true || combatQueueItems.length === 0) {
      return;
    }

    isCombatQueueProcessing = true;

    const id = uuid();
    const data = combatQueueItems[0];
    const combatEntry = document.createElement('div');

    combatEntry.classList.add('tm-c-log__entry');
    combatEntry.setAttribute('data-id', id);

    if (data.state === 'CREATURE_DEATH') {
      combatEntry.classList.add('tm-c-log__death');
    }

    if (data.state === 'DUNGEON_ADVANCE') {
      combatEntry.classList.add('tm-c-log__advance');
    }

    document.querySelector('.tm-c-log__container').appendChild(combatEntry);

    const prefix = data.message.direction === 'inbound' ? '>> *' : '<< *';
    const hydratedMessage = hydrate(`${prefix} ${data.message.copy}`, data.variables);

    type(`.tm-c-log__entry[data-id="${id}"]`, hydratedMessage, () => {
      isCombatQueueProcessing = false;
      combatQueueItems.splice(0, 1);
    });
  }, 50);
}
