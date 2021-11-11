import Dungeon from 'instances/Dungeon';
import Creature from 'components/Creature';
import bind from 'events/delegate/bind';
import { CREATURE_UPDATE } from 'events/events';

bind(CREATURE_UPDATE, 'body', function () {
  const creature = Dungeon.creatures[0];

  if (creature !== undefined) {
    document.querySelector('.tm-c-creature').outerHTML = Creature();
  }
});

export default true;
