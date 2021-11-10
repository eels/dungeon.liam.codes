import PlayerEntity from 'lib/entities/PlayerEntity';

export const initialPlayerState = {
  actionTaken: false,
  ad: 0,
  armor: 0,
  availableCards: [],
  deck: [],
  gold: 0,
  hp: 50,
  kills: 0,
  maxAd: 0,
  maxHp: 50,
  maxMp: 50,
  mp: 50,
  status: 'normal',
  statusDuration: 0,
  totalGold: 0,
};

const Player = new PlayerEntity(initialPlayerState);

export default Player;
