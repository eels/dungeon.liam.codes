import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import cards from 'data/cards';
import dispatch from 'events/delegate/dispatch';
import hydrate from 'utilities/hydrate';
import messages from 'data/messages';
import { PLAYER_UPDATE_STATS } from 'events/events';

bind('click', '.js-buy', function (event) {
  const cardElement = event.target.closest('.tm-c-shop__card-container').children;
  const cardName = cardElement[0].querySelector('.tm-c-card__name').innerHTML;
  const selectedCard = cards.filter((card) => cardName === card.name)[0];
  const cardPrice = selectedCard.price;
  const playerAvailableCards = [...Player.availableCards];
  const messagesContainer = document.querySelector('.tm-c-message [class*="status"]');

  messagesContainer.classList.remove('tm-c-shop__status--error');

  if (Math.max(Player.gold - selectedCard.price, 0) === 0) {
    messagesContainer.innerHTML = hydrate(messages.CHECKPOINT_PURCHASE_ERROR, []);
    messagesContainer.classList.add('tm-c-shop__status--error');

    return;
  }

  playerAvailableCards.push(selectedCard);

  Player.setState({ gold: Player.gold - cardPrice }).commit();
  Player.setState({ availableCards: playerAvailableCards }).commit();

  messagesContainer.innerHTML = hydrate(message.CHECKPOINT_PURCHASE, [selectedCard.name]);

  dispatch(PLAYER_UPDATE_STATS);
});

export default true;
