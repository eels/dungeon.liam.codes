import DungeonEntity from 'lib/entities/DungeonEntity';

export const initialDungeonState = {
  creatures: [],
  level: 1,
};

const Dungeon = new DungeonEntity({ ...initialDungeonState });

export default Dungeon;
