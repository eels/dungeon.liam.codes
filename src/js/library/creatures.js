export default [
  {
    name: 'swarm of rats',
    level: 1,
    health: 4,
    mana: 5,
    armor: 4,
    armorDurability: 5,
    attack: 2,
    gold: 2,
    weakness: 'fire',
    specials: [
      {
        effect: 'damage',
        damage: 3,
        cost: 1,
        chance: 80,
        message: '* >> Enemy *name* engulfs your body dealing *damage* damage'
      }
    ]
  },
  {
    name: 'kobold',
    level: 1,
    health: 4,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 2,
    gold: 3
  },
  {
    name: 'goblin',
    level: 1,
    health: 5,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 2,
    gold: 4
  },
  {
    name: 'skeleton',
    level: 1,
    health: 5,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 3,
    gold: 4,
    resistance: 'poison'
  },
  {
    name: 'gnoll',
    level: 2,
    health: 7,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 4,
    gold: 6,
    weakness: 'fire'
  },
  {
    name: 'grey ooze',
    level: 2,
    health: 9,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 2,
    gold: 6,
    weakness: 'electric'
  },
  {
    name: 'orc warrior',
    level: 2,
    health: 6,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 4,
    gold: 6
  },
  {
    name: 'worg',
    level: 2,
    health: 7,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 4,
    gold: 5
  },
  {
    name: 'giant spider',
    level: 3,
    health: 10,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 6,
    gold: 7,
    weakness: 'fire',
    resistance: 'poison'
  },
  {
    name: 'harpy',
    level: 3,
    health: 8,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 6,
    gold: 10,
    weakness: 'fire',
    resistance: 'poison'
  },
  {
    name: 'gargoyle',
    level: 3,
    health: 10,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 6,
    gold: 4,
    resistance: 'electric'
  },
  {
    name: 'mimic',
    level: 3,
    health: 15,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 1,
    gold: 15
  },
  {
    name: 'quaggoth',
    level: 4,
    health: 10,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 8,
    gold: 10
  },
  {
    name: 'basalisk',
    level: 4,
    health: 10,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 8,
    gold: 10
  },
  {
    name: 'doppelganger',
    level: 4,
    health: 12,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 10,
    gold: 12
  },
  {
    name: 'minotaur',
    level: 4,
    health: 14,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 12,
    gold: 11
  },
  {
    name: 'banshee',
    level: 5,
    health: 16,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 13,
    gold: 15
  },
  {
    name: 'demogorgon',
    level: 5,
    health: 16,
    mana: 5,
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
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 15,
    gold: 18
  },
  {
    name: 'wyvern',
    level: 5,
    health: 19,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 17,
    gold: 20,
    resistance: 'fire'
  }
];
