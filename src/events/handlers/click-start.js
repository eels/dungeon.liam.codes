import Dungeon from 'instances/Dungeon';
import Tick from 'instances/Tick';
import bind from 'events/delegate/bind';
import log from 'functions/combat-log';
import messages from 'data/messages';

bind('click', '.js-start', function () {
  document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');

  Tick.start();
  log(messages.PLAYER_ADVANCE_ENCOUNTER, [Dungeon.creatures[0].name]);
});

export default true;
