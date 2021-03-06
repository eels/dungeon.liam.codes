import Player from 'instances/Player';
import ShopScreen from 'components/ShopScreen';
import Tick from 'instances/Tick';
import TreasureScreen from 'components/TreasureScreen';
import bind from 'events/delegate/bind';
import { ENTER_SHOP } from 'events/events';

bind(ENTER_SHOP, 'body', function () {
  Tick.stop();

  Player.setState({ actionTaken: true }).commit();

  const healthRestored = Math.ceil(Player.hp * (5 / 100));
  const manaRestored = Math.ceil(Player.mp * (5 / 100));

  Player.setState({ hp: Math.min(Player.hp + healthRestored, Player.maxHp) }).commit();
  Player.setState({ mp: Math.min(Player.mp + manaRestored, Player.maxMp) }).commit();

  document.querySelector('.tm-c-timer').style.width = '100%';
  document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
  document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');

  const treasureChance = Math.round(Math.random() * 10);
  const component = treasureChance > 7 ? TreasureScreen : ShopScreen;

  document.querySelector('.tm-c-message__container').innerHTML = component(null);
});

export default true;
