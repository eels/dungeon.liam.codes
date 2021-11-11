import * as advanceDungeon from 'data/messages/advance-dungeon';
import * as cardEffect from 'data/messages/card-effect';
import * as checkpoint from 'data/messages/checkpoint';
import * as creatureDeath from 'data/messages/creature-death';
import * as creatureEffect from 'data/messages/creature-effect';
import * as statusEffect from 'data/messages/status-effect';

export default {
  ...advanceDungeon,
  ...cardEffect,
  ...checkpoint,
  ...creatureDeath,
  ...creatureEffect,
  ...statusEffect,
};
