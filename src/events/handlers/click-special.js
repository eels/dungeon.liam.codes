import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import dispatch from 'events/delegate/dispatch';
import findCardByColumn from 'functions/find-card-by-column';
import hydrate from 'utilities/hydrate';
import messages from 'data/messages';
import specials from 'data/specials/cards';
import { PLAYER_UPDATE_STATS } from 'events/events';

bind('click', '.js-special', function (event) {
  const isShop = document.querySelector('.tm-c-shop') !== null;
  const errorClass = isShop ? 'tm-c-shop__status--error' : 'tm-c-treasure__status--error';
  const messagesContainer = document.querySelector('.tm-c-message [class*="status"]');
  const specialCard = event.target.parentNode.querySelector('.tm-c-card');
  const name = specialCard.querySelector('.tm-c-card__name').innerHTML.trim();

  const [card] = findCardByColumn(specials, 'name', name);

  if (!card) {
    return;
  }

  messagesContainer.classList.remove(errorClass);

  if (Player.gold - card.price < 0) {
    messagesContainer.innerHTML = hydrate(messages.CHECKPOINT_SPECIAL_ERROR.copy);
    messagesContainer.classList.add(errorClass);

    return;
  }

  Player.setState({ gold: Player.gold - card.price }).commit();

  if (card.effect === 'heal-hp') {
    Player.setState({ hp: Math.min(Player.hp + card.health, Player.maxHp) }).commit();
  }

  if (card.effect === 'heal-mp') {
    Player.setState({ mp: Math.min(Player.mp + card.mana, Player.maxMp) }).commit();
  }

  if (card.effect === 'increase-hp') {
    Player.setState({ maxHp: Math.min(Player.maxHp + card.maxHealth, 999) }).commit();
    Player.setState({ hp: Math.min(Player.hp + card.maxHealth, Player.maxHp) }).commit();
  }

  if (card.effect === 'increase-mp') {
    Player.setState({ maxMp: Math.min(Player.maxMp + card.maxMana, 999) }).commit();
    Player.setState({ mp: Math.min(Player.mp + card.maxMana, Player.maxMp) }).commit();
  }

  messagesContainer.innerHTML = hydrate(card.message.copy);

  dispatch(PLAYER_UPDATE_STATS);
});

export default true;
