import CLICK__BUY from 'events/click__buy';
import CLICK__CARD from 'events/click__card';
import CLICK__CONTINUE from 'events/click__continue';
import CLICK__RESTART from 'events/click__restart';
import CLICK__START from 'events/click__start';
import CREATURE_UPDATE from 'events/CREATURE_UPDATE';
import ENTER_SHOP from 'events/ENTER_SHOP';
import PLAYER_ACTION from 'events/PLAYER_ACTION';
import PLAYER_UPDATE_HAND from 'events/PLAYER_UPDATE_HAND';
import PLAYER_UPDATE_STATS from 'events/PLAYER_UPDATE_STATS';
import TICK_SEGMENT from 'events/TICK_SEGMENT';
import TICK from 'events/TICK';

export default function() {
  CLICK__BUY();
  CLICK__CARD();
  CLICK__CONTINUE();
  CLICK__RESTART();
  CLICK__START();
  CREATURE_UPDATE();
  ENTER_SHOP();
  PLAYER_ACTION();
  PLAYER_UPDATE_HAND();
  PLAYER_UPDATE_STATS();
  TICK_SEGMENT();
  TICK();
};
