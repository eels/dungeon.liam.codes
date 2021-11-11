import { combatQueueItems } from 'functions/process-combat-queue';

export default function log(message, variables = [], state = false) {
  combatQueueItems.push({ message, state, variables });
}
