import { on, fire } from 'utilities/delegation';
import { Player } from 'instances/player';
import { advanceDungeonLevel } from 'functions/advance-dungeon-level';
import Cards from 'library/cards';

export default function() {
  on('click', '.js-take', event => {
    const cardElement = event.target.closest('.tm-c-treasure__card-container').children;
    const cardName = cardElement[0].querySelector('.tm-c-card__name').innerHTML;
    const selectedCard = Cards.filter(card => cardName === card.name)[0];
    const playerAvailableCards = Player.store.state.availableCards;

    playerAvailableCards.push(selectedCard);
    Player.store.commit({ availableCards: playerAvailableCards });

    advanceDungeonLevel();
  });
};
