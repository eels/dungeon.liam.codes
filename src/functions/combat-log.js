import { combatQueueItems } from 'functions/process-combat-queue';

export default function log(copy, state = '') {
  combatQueueItems.push({ copy, state });
}
