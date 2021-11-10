import Player from 'instances/Player';
import advanceDungeonLevel from 'functions/advance-dungeon-level';
import bind from 'events/delegate/bind';
import cards from 'data/cards';

bind('click', '.js-take', function (event) {
  const cardElement = event.target.closest('.tm-c-treasure__card-container').children;
  const cardName = cardElement[0].querySelector('.tm-c-card__name').innerHTML;
  const selectedCard = cards.filter((card) => cardName === card.name)[0];
  const playerAvailableCards = Player.availableCards;

  playerAvailableCards.push(selectedCard);
  Player.setState({ availableCards: playerAvailableCards }).commit();

  advanceDungeonLevel();
});

export default true;
