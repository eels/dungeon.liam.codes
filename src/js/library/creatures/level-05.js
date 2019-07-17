export default [
  {
    name: 'banshee',
    level: 5,
    health: 16,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 13,
    gold: 15
  },
  {
    name: 'demogorgon',
    level: 5,
    health: 16,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 15,
    gold: 17,
    resistance: 'poison'
  },
  {
    name: 'troll',
    level: 5,
    health: 18,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 15,
    gold: 18,
    resistance: 'nature'
  },
  {
    name: 'wyvern',
    level: 5,
    health: 19,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 17,
    gold: 20,
    resistance: 'fire',
    specials: [
      {
        effect: 'damage',
        damage: 20,
        element: 'fire',
        chance: 20,
        message: '* >> Enemy *name* breathes fire scorching you for *damage* damage'
      },
    ]
  }
];
