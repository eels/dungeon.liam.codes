import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import dispatch from 'events/delegate/dispatch';
import { PLAYER_UPDATE_STATS } from 'events/events';

bind('click', '.js-heal', function () {
  const cardPrice = 20;
  const playerGold = Player.gold;
  const errorClass =
    document.querySelector('.tm-c-shop') !== null
      ? 'tm-c-shop__status--error'
      : 'tm-c-treasure__status--error';

  document.querySelector('.tm-c-message [class*="status"]').classList.remove(errorClass);

  if (playerGold - cardPrice < 0) {
    document.querySelector('.tm-c-message [class*="status"]').innerHTML =
      '"You do not possess enough gold for that blessing"';
    document.querySelector('.tm-c-message [class*="status"]').classList.add(errorClass);
    return;
  }

  Player.setState({ gold: playerGold - cardPrice }).commit();
  Player.setState({ hp: Math.min(Player.hp + 25, Player.maxHp) }).commit();

  document.querySelector('.tm-c-message [class*="status"]').innerHTML =
    '"A bright light surrounds you as your health is restored"';

  dispatch(PLAYER_UPDATE_STATS);
});

export default true;
