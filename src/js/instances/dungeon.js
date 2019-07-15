import DungeonClass from 'classes/dungeon';

const DungeonState = {
  level: 1,
  creatures: []
};

const Dungeon = new DungeonClass(DungeonState);

export { Dungeon };
