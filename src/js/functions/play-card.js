import { capitalize } from 'utilities/capitalize';
import { fire } from 'utilities/delegation';
import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { applyCardEffect } from 'functions/card-effects';
import { log } from 'functions/combat-log';
import { addToDiscard } from 'functions/discard';

const playCard = (id) => {
  const creature = Dungeon.store.state.creatures[0];
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

  if (played.element !== undefined) {
    if (creature.store.state.raw.resistance === played.element) {
      log(`* << Enemy ${capitalize(creature.store.state.raw.name)} resisted your <div class="tm-c-log__keyword">${played.element}</div> attack`);
      fire('PLAYER_UPDATE_HAND', { 'discard': document.querySelector('.js-discard').children });
      return;
    }
  }

  applyCardEffect(played);
  fire('PLAYER_UPDATE_HAND', { 'discard': document.querySelector('.js-discard').children });
};

export { playCard };
