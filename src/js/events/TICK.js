import { on, fire } from 'utilities/delegation';
import { processCreatureStatusEffect } from 'functions/process-creature-status-effect';
import { processCreatureAttack } from 'functions/process-creature-attack';
import { processPlayerStatusEffect } from 'functions/process-player-status-effect';

export default function() {
  on('TICK', 'body', event => {
    processCreatureStatusEffect();
    processCreatureAttack();
    processPlayerStatusEffect();
  });
};
