import Player from 'instances/Player';
import advanceDungeonLevel from 'functions/advance-dungeon-level';
import bind from 'events/delegate/bind';
import cards from 'data/cards';
import findCardByColumn from 'functions/find-card-by-column';

bind('click', '.js-take', function (event) {
  const cardElement = event.target.closest('.tm-c-treasure__card-container').children;
  const cardName = cardElement[0].querySelector('.tm-c-card__name').innerHTML.trim();
  const playerAvailableCards = [...Player.availableCards];

  const [card] = findCardByColumn(cards, 'name', cardName);

  if (!card) {
    return;
  }

  playerAvailableCards.push(card);
  Player.setState({ availableCards: playerAvailableCards }).commit();

  advanceDungeonLevel();
});

export default true;
