import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import addToDiscard from 'functions/add-to-discard';
import applyCardEffects from 'functions/apply-card-effects';
import capitalize from 'utilities/capitalize';
import dispatch from 'events/delegate/dispatch';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { PLAYER_UPDATE_HAND, PLAYER_UPDATE_STATS } from 'events/events';

export default function playCard(id) {
  const creature = Dungeon.creatures[0];
  const name = capitalize(creature.raw.name);
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

  if (playedCard.cost && Math.max(Player.mp - playedCard.cost, 0) === 0) {
    return;
  }

  Player.setState({ mp: Player.mp - (playedCard.cost || 0) }).commit();
  Player.setState({ deck: playableDeck }).commit();

  addToDiscard();

  dispatch(PLAYER_UPDATE_STATS);
  dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });

  if (playedCard.element && creature.raw.resistance === playedCard.element) {
    log(messages.PLAYER_CARD_EFFECT_CREATURE_RESIST, [name, playedCard.element]);
    dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });

    return;
  }

  applyCardEffects(playedCard);
}
