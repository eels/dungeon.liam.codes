import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import cards from 'data/cards';
import dispatch from 'events/delegate/dispatch';
import findCardByColumn from 'functions/find-card-by-column';
import hydrate from 'utilities/hydrate';
import messages from 'data/messages';
import { PLAYER_UPDATE_STATS } from 'events/events';

bind('click', '.js-buy', function (event) {
  const cardElement = event.target.closest('.tm-c-shop__card-container').children;
  const cardName = cardElement[0].querySelector('.tm-c-card__name').innerHTML.trim();
  const messagesContainer = document.querySelector('.tm-c-message [class*="status"]');
  const playerAvailableCards = [...Player.availableCards];

  const [card] = findCardByColumn(cards, 'name', cardName);

  if (!card) {
    return;
  }

  messagesContainer.classList.remove('tm-c-shop__status--error');

  if (Player.gold - card.price < 0) {
    messagesContainer.innerHTML = hydrate(messages.CHECKPOINT_PURCHASE_ERROR.copy, []);
    messagesContainer.classList.add('tm-c-shop__status--error');

    return;
  }

  playerAvailableCards.push(card);

  Player.setState({ gold: Player.gold - card.price }).commit();
  Player.setState({ availableCards: playerAvailableCards }).commit();

  messagesContainer.innerHTML = hydrate(messages.CHECKPOINT_PURCHASE.copy, [card.name]);

  dispatch(PLAYER_UPDATE_STATS);
});

export default true;
