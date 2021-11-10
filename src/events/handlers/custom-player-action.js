import Player from 'instances/Player';
import bind from 'events/delegate/bind';
import { PLAYER_ACTION } from 'events/events';

bind(PLAYER_ACTION, 'body', function () {
  Player.setState({ actionTaken: true }).commit();
});

export default true;
