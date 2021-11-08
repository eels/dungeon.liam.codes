export default [
  // weapons
  {
    set: 'base',
    name: 'dagger',
    damage: 1,
    effect: 'damage',
    icon: 'dagger',
  },
  {
    set: 'base',
    name: 'sword',
    damage: 2,
    effect: 'damage',
    icon: 'sword',
  },
  {
    set: 'base',
    name: 'short bow',
    damage: 3,
    effect: 'damage',
    icon: 'bow',
  },

  // magic
  {
    set: 'base',
    name: 'fireball',
    damage: 1,
    cost: 2,
    effect: 'damage',
    element: 'fire',
    icon: 'magic',
  },
  {
    set: 'base',
    name: 'drown',
    damage: 2,
    cost: 3,
    effect: 'damage',
    element: 'water',
    icon: 'magic',
  },
  {
    set: 'base',
    name: 'tangle',
    damage: 2,
    cost: 3,
    effect: 'damage',
    element: 'nature',
    icon: 'magic',
  },

  // armor
  {
    set: 'base',
    name: 'gloves',
    armor: 1,
    durability: 2,
    effect: 'armor',
    icon: 'gloves',
  },
  {
    set: 'base',
    name: 'helm',
    armor: 2,
    durability: 3,
    effect: 'armor',
    icon: 'helm',
  },
  {
    set: 'base',
    name: 'chest',
    armor: 3,
    durability: 4,
    effect: 'armor',
    icon: 'breastplate',
  },

  // items
  {
    set: 'base',
    name: 'hp potion',
    health: 3,
    effect: 'heal',
    icon: 'potion',
  },
  {
    set: 'base',
    name: 'mp potion',
    mana: 3,
    effect: 'mana',
    icon: 'potion',
  },
  {
    set: 'base',
    name: 'whirlwind',
    effect: 're-draw',
    keyword: 're-draw',
    icon: 'shuffle',
  },
];
