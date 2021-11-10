import Hand from 'components/Hand';
import bind from 'events/delegate/bind';
import { PLAYER_UPDATE_HAND } from 'events/events';

bind(PLAYER_UPDATE_HAND, 'body', function (event) {
  const discardPile = document.querySelector('.js-discard').children;
  const discardPileArray = Array.from(discardPile);

  document.querySelector('.tm-c-hand').outerHTML = Hand();

  if (event.detail.shouldMaintainDiscardState !== undefined) {
    for (const card of discardPileArray) {
      document.querySelector('.js-discard').appendChild(card);
    }
  }
});

export default true;
