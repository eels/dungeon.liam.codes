import { on, fire } from 'utilities/delegation';
import { processCreatureStatusEffect } from 'functions/process-creature-status-effect';
import { processPlayerStatusEffect } from 'functions/process-player-status-effect';
import { resetTimer } from 'functions/reset-timer';

export default function() {
  on('TICK', 'body', event => {
    processCreatureStatusEffect();
    processPlayerStatusEffect();
    resetTimer();
  });
};
