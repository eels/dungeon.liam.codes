import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import addToDiscard from 'functions/add-to-discard';
import applyCardEffects from 'functions/apply-card-effects';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import { PLAYER_UPDATE_HAND, PLAYER_UPDATE_STATS } from 'events/events';

export default function playCard(id) {
  const creature = Dungeon.creatures[0];
  const playableDeck = [...Player.deck];
  const playableDeckEntries = Object.entries(playableDeck);

  let playedCard = false;

  for (const [index, card] of playableDeckEntries) {
    if (card.id !== id) {
      continue;
    }

    playedCard = card;
    playableDeck.splice(parseInt(index), 1);
    playableDeck.push(card);
  }

  if (!playedCard) {
    return;
  }

  if (playedCard.cost) {
    if (Player.mp - playedCard.cost < 0) {
      return;
    }

    Player.setState({ mp: Player.mp - playedCard.cost }).commit();
    dispatch(PLAYER_UPDATE_STATS);
  }

  addToDiscard();
  Player.setState({ deck: playableDeck }).commit();

  if (playedCard.element !== undefined) {
    if (creature.raw.resistance === playedCard.element) {
      log(
        `* << Enemy ${capitalize(creature.raw.name)} resisted your <div class="tm-c-log__keyword">${
          playedCard.element
        }</div> attack`,
      );
      dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });

      return;
    }
  }

  applyCardEffects(playedCard);
  dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });
}
