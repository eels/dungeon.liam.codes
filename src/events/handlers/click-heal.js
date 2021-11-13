import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import dispatch from 'events/delegate/dispatch';
import hydrate from 'utilities/hydrate';
import messages from 'data/messages';
import specials from 'data/specials/cards';
import { PLAYER_UPDATE_STATS } from 'events/events';

bind('click', '.js-heal', function () {
  const isShop = document.querySelector('.tm-c-shop') !== null;
  const errorClass = isShop ? 'tm-c-shop__status--error' : 'tm-c-treasure__status--error';
  const checkpointHeal = specials.special_heal;
  const messagesContainer = document.querySelector('.tm-c-message [class*="status"]');

  messagesContainer.classList.remove(errorClass);

  if (Player.gold - checkpointHeal.price < 0) {
    messagesContainer.innerHTML = hydrate(messages.CHECKPOINT_HEAL_ERROR.copy);
    messagesContainer.classList.add(errorClass);

    return;
  }

  Player.setState({ gold: Player.gold - checkpointHeal.price }).commit();
  Player.setState({ hp: Math.min(Player.hp + checkpointHeal.health, Player.maxHp) }).commit();

  messagesContainer.innerHTML = hydrate(messages.CHECKPOINT_HEAL.copy);

  dispatch(PLAYER_UPDATE_STATS);
});

export default true;
