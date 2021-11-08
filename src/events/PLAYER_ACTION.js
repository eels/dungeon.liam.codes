import { on } from 'utilities/delegation';
import { Player } from 'instances/player';

export default function() {
  on('PLAYER_ACTION', 'body', event => {
    Player.store.commit({ actionTaken: event.detail.PLAYER_ACTION });
  });
};
