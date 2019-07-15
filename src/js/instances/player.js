import PlayerClass from 'classes/player';

const PlayerState = {
  actionTaken: false,
  status: 'ticking',
  deck: [],
  gold: 0,
  kills: 0,
  hp: 50,
  maxHp: 50,
  mp: 50,
  maxMp: 50,
  armor: 0,
  ad: 0,
  maxAd: 0
};

const Player = new PlayerClass(PlayerState);

export { Player };
