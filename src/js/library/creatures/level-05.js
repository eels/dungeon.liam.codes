export default [
  {
    name: 'banshee',
    level: 5,
    health: 7,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 7,
    gold: 9
  },
  {
    name: 'demogorgon',
    level: 5,
    health: 8,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 7,
    gold: 10,
    resistance: 'poison'
  },
  {
    name: 'troll',
    level: 5,
    health: 10,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 8,
    gold: 11,
    resistance: 'nature'
  },
  {
    name: 'wyvern',
    level: 5,
    health: 11,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 10,
    gold: 11,
    resistance: 'fire',
    specials: [
      {
        effect: 'damage',
        damage: 10,
        element: 'fire',
        chance: 20,
        message: '* >> Enemy *name* breathes fire scorching you for *damage* damage'
      },
    ]
  }
];
