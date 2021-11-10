import advanceDungeonLevel from 'functions/advance-dungeon-level';
import bind from 'events/delegate/bind';

bind('click', '.js-continue', function () {
  advanceDungeonLevel();
});

export default true;
