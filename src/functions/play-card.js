import Dungeon from 'instances/Dungeon';
import Player from 'instances/Player';
import addToDiscard from 'functions/add-to-discard';
import applyCardEffects from 'functions/apply-card-effects';
import dispatch from 'events/delegate/dispatch';
import findCardByColumn from 'functions/find-card-by-column';
import log from 'functions/combat-log';
import messages from 'data/messages';
import { PLAYER_UPDATE_HAND, PLAYER_UPDATE_STATS } from 'events/events';

export default function playCard(id) {
  const creature = Dungeon.creatures[0];
  const playableDeck = [...Player.deck];

  const [card, index] = findCardByColumn(playableDeck, 'id', id);

  if (!card) {
    return;
  }

  playableDeck.splice(parseInt(index), 1);
  playableDeck.push(card);

  if (card.cost && Math.max(Player.mp - card.cost, 0) === 0) {
    return;
  }

  Player.setState({ mp: Player.mp - (card.cost || 0) }).commit();
  Player.setState({ deck: playableDeck }).commit();

  addToDiscard();

  dispatch(PLAYER_UPDATE_STATS);
  dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });

  if (card.element && creature.raw.resistance === card.element) {
    log(messages.PLAYER_CARD_EFFECT_CREATURE_RESIST, [creature.name, card.element]);
    dispatch(PLAYER_UPDATE_HAND, { shouldMaintainDiscardState: true });

    return;
  }

  applyCardEffects(card);
}
