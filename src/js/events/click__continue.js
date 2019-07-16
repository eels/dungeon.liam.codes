import { on } from 'utilities/delegation';
import { advanceDungeonLevel } from 'functions/advance-dungeon-level';

export default function() {
  on('click', '.js-continue', event => {
    advanceDungeonLevel();
  });
};
