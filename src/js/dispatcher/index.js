import CLICK__RESTART from 'events/click__restart';
import CLICK__START from 'events/click__start';
import CREATURE_UPDATE from 'events/CREATURE_UPDATE';
import PLAYER_ACTION from 'events/PLAYER_ACTION';
import PLAYER_UPDATE_HAND from 'events/PLAYER_UPDATE_HAND';
import PLAYER_UPDATE_STATS from 'events/PLAYER_UPDATE_STATS';
import TICK from 'events/TICK';

export default function() {
  CLICK__RESTART();
  CLICK__START();
  CREATURE_UPDATE();
  PLAYER_ACTION();
  PLAYER_UPDATE_HAND();
  PLAYER_UPDATE_STATS();
  TICK();
};
