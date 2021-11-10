export default [
  // weapons
  {
    damage: 1,
    effect: 'damage',
    icon: 'dagger',
    name: 'dagger',
    set: 'base',
  },
  {
    damage: 2,
    effect: 'damage',
    icon: 'sword',
    name: 'sword',
    set: 'base',
  },
  {
    damage: 3,
    effect: 'damage',
    icon: 'bow',
    name: 'short bow',
    set: 'base',
  },

  // magic
  {
    cost: 2,
    damage: 1,
    effect: 'damage',
    element: 'fire',
    icon: 'magic',
    name: 'fireball',
    set: 'base',
  },
  {
    cost: 3,
    damage: 2,
    effect: 'damage',
    element: 'water',
    icon: 'magic',
    name: 'drown',
    set: 'base',
  },
  {
    cost: 3,
    damage: 2,
    effect: 'damage',
    element: 'nature',
    icon: 'magic',
    name: 'tangle',
    set: 'base',
  },

  // armor
  {
    armor: 1,
    durability: 2,
    effect: 'armor',
    icon: 'gloves',
    name: 'gloves',
    set: 'base',
  },
  {
    armor: 2,
    durability: 3,
    effect: 'armor',
    icon: 'helm',
    name: 'helm',
    set: 'base',
  },
  {
    armor: 3,
    durability: 4,
    effect: 'armor',
    icon: 'breastplate',
    name: 'chest',
    set: 'base',
  },

  // items
  {
    effect: 'heal',
    health: 3,
    icon: 'potion',
    name: 'hp potion',
    set: 'base',
  },
  {
    effect: 'mana',
    icon: 'potion',
    mana: 3,
    name: 'mp potion',
    set: 'base',
  },
  {
    effect: 're-draw',
    icon: 'shuffle',
    keyword: 're-draw',
    name: 'whirlwind',
    set: 'base',
  },
];
