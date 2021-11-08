import { Player } from 'instances/player';
import { Tick } from 'instances/tick';
import DeathScreen from 'components/death-screen';

const processPlayerDeath = () => {
  Tick.stop();
  Player.store.commit({ actionTaken: true });
  document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
  document.querySelector('.tm-c-stats').classList.add('tm-c-stats--disabled');
  document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');
  document.querySelector('.tm-c-message__container').innerHTML = DeathScreen();
};

export { processPlayerDeath };
