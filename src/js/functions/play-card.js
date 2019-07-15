import { fire } from 'utilities/delegation';
import { Player } from 'instances/player';
import { applyCardEffect } from 'functions/card-effects';
import { addToDiscard } from 'functions/discard';

const playCard = (id) => {
  const deck = Player.store.state.deck.slice(0);
  let found = false;
  let errors = false;
  let played;

  deck.forEach((card, i) => {
    if (card.id !== parseInt(id) || found) {
      return;
    }

    found = true;
    played = card;

    if (played.cost) {
      if (Player.store.state.mp - played.cost < 0) {
        errors = true;
        return;
      } else {
        Player.store.commit({ mp: Player.store.state.mp - played.cost });
        fire('PLAYER_UPDATE_STATS');
      }
    }

    deck.splice(i, 1)
    deck.push(card);
  });

  if (errors) {
    return;
  }

  addToDiscard();
  Player.store.commit({ deck: deck });

  applyCardEffect(played);
  fire('PLAYER_UPDATE_HAND', { 'discard': document.querySelector('.js-discard').children });
};

export { playCard };
