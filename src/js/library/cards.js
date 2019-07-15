export default [
  {
    name: 'sword',
    damage: 3,
    effect: 'damage',
    icon: 'sword'
  },
  {
    name: 'flame sword',
    damage: 5,
    effect: 'damage',
    element: 'fire',
    icon: 'sword'
  },
  {
    name: 'axe',
    damage: 3,
    effect: 'damage',
    icon: 'axe'
  },
  {
    name: 'fireball',
    damage: 2,
    cost: 3,
    effect: 'damage',
    element: 'fire',
    icon: 'magic'
  },
  {
    name: 'blizzard',
    cost: 5,
    effect: 'freeze',
    duration: 2,
    element: 'ice',
    keyword: 'freeze',
    icon: 'magic'
  },
  {
    name: 'h. potion',
    health: 3,
    effect: 'health potion',
    icon: 'potion'
  },
  {
    name: 'm. potion',
    mana: 3,
    effect: 'mana potion',
    icon: 'potion'
  },
  {
    name: 'whirlwind',
    effect: 'shuffle',
    keyword: 'shuffle',
    icon: 'shuffle'
  }
];
