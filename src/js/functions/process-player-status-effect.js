import { fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import { Player } from 'instances/player';
import Timer from 'components/timer';

const processPlayerStatusEffect = () => {
  if (Player.store.state.status === 'staged') {
    this.store.commit({ status: 'ticking' });
  }

  if (Player.store.state.status !== 'paused' && Player.store.state.status !== 'staged') {
    const timer = document.querySelector('.tm-c-timer');
    timer.parentNode.insertBefore(nodize(Timer()), timer);
    timer.parentNode.removeChild(timer);
    fire('PLAYER_ACTION', { 'PLAYER_ACTION': false });
    document.querySelector('.tm-c-hand').classList.remove('tm-c-hand--disabled');
  }
};

export { processPlayerStatusEffect };
