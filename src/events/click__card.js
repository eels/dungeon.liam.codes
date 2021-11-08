import { on, fire } from 'utilities/delegation';
import { Player } from 'instances/player';
import { playCard } from 'functions/play-card';

export default function() {
  on('click', '.js-card', event => {
    if (!Player.store.state.actionTaken) {
      playCard(event.selector.getAttribute('data-id'));
    }

    fire('PLAYER_ACTION', { 'PLAYER_ACTION': true });
    document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
  });
};
