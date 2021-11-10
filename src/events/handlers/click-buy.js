import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import cards from 'data/cards';
import dispatch from 'events/delegate/dispatch';
import { PLAYER_UPDATE_STATS } from 'events/events';

bind('click', '.js-buy', function (event) {
  const cardElement = event.target.closest('.tm-c-shop__card-container').children;
  const cardName = cardElement[0].querySelector('.tm-c-card__name').innerHTML;
  const selectedCard = cards.filter((card) => cardName === card.name)[0];
  const cardPrice = selectedCard.price;
  const playerGold = Player.gold;
  const playerAvailableCards = Player.availableCards;

  document.querySelector('.tm-c-shop__status').classList.remove('tm-c-shop__status--error');

  if (playerGold - cardPrice < 0) {
    document.querySelector('.tm-c-shop__status').innerHTML =
      '"You do not possess enough gold to buy that card"';
    document.querySelector('.tm-c-shop__status').classList.add('tm-c-shop__status--error');
    return;
  }

  playerAvailableCards.push(selectedCard);

  Player.setState({ gold: playerGold - cardPrice }).commit();
  Player.setState({ availableCards: playerAvailableCards }).commit();

  document.querySelector(
    '.tm-c-shop__status',
  ).innerHTML = `"Excellent choice! <div class="tm-c-shop__status--name">${selectedCard.name}</div> has been added to your deck"`;

  dispatch(PLAYER_UPDATE_STATS);
});

export default true;
