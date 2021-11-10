import Stats from 'components/Stats';
import bind from 'events/delegate/bind';
import { PLAYER_UPDATE_STATS } from 'events/events';

bind(PLAYER_UPDATE_STATS, 'body', function () {
  document.querySelector('.tm-c-stats').outerHTML = Stats();
});

export default true;
