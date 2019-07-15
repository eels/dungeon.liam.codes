import { on, fire } from 'utilities/delegation';
import { Player } from 'instances/player';
import Cards from 'library/cards';

export default function() {
  on('click', '.js-buy', event => {
    const cardElement = event.target.closest('.tm-c-shop__card-container').children;
    const cardName = cardElement[0].querySelector('.tm-c-card__name').innerHTML;
    const selectedCard = Cards.filter(card => cardName === card.name)[0];
    const cardPrice = selectedCard.price;
    const playerGold = Player.store.state.gold;
    const playerAvailableCards = Player.store.state.availableCards;

    document.querySelector('.tm-c-shop__status').classList.remove('tm-c-shop__status--error');

    if (playerGold - cardPrice < 0) {
      document.querySelector('.tm-c-shop__status').innerHTML = '"You do not possess enough gold to buy that card"';
      document.querySelector('.tm-c-shop__status').classList.add('tm-c-shop__status--error');
      return;
    }

    playerAvailableCards.push(selectedCard);
    Player.store.commit({ gold: playerGold - cardPrice });
    Player.store.commit({ availableCards: playerAvailableCards });
    document.querySelector('.tm-c-shop__status').innerHTML = `"Excellent choice! <div class="tm-c-shop__status--name">${selectedCard.name}</div> has been added to your deck"`;

    fire('PLAYER_UPDATE_STATS');
  });
};
