import { on } from 'utilities/delegation';
import { Tick } from 'instances/tick';
import { processCombatQueue } from 'functions/combat-log';

export default function() {
  on('click', '.js-start', () => {
    document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');
    document.querySelector('.tm-c-stats').classList.remove('tm-c-stats--disabled');
    Tick.start();
    processCombatQueue();
  });
};
