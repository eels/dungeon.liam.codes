import { on } from 'utilities/delegation';
import Hand from 'components/hand';

export default function() {
  on('PLAYER_UPDATE_HAND', 'body', event => {
    document.querySelector('.tm-c-hand').outerHTML = Hand();
    Array.from(event.detail.discard).map(card => {
      document.querySelector('.js-discard').appendChild(card)
    });
  });
};
