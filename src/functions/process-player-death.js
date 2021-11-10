import DeathScreen from 'components/DeathScreen';
import Player from 'instances/Player';
import Tick from 'instances/Tick';

export default function processPlayerDeath() {
  Tick.stop();

  Player.setState({ actionTaken: true }).commit();

  document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
  document.querySelector('.tm-c-stats').classList.add('tm-c-stats--disabled');
  document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');
  document.querySelector('.tm-c-message__container').innerHTML = DeathScreen();
}
