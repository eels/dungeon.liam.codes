import PlayerClass from 'classes/player';
import { Tick } from 'instances/tick';

const PlayerState = {
  actionTaken: false,
  status: 'ticking',
  deck: [],
  gold: 0,
  kills: 0,
  hp: 50,
  maxHp: 50,
  mp: 50,
  maxMp: 50
};

const Player = new PlayerClass(Tick, PlayerState);

export { Player };
