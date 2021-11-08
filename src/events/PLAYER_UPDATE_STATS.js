import { on } from 'utilities/delegation';
import Stats from 'components/stats';

export default function() {
  on('PLAYER_UPDATE_STATS', 'body', event => {
    document.querySelector('.tm-c-stats').outerHTML = Stats();
  });
};
