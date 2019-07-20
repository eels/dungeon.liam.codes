export default [
  {
    name: 'quaggoth',
    level: 4,
    health: 7,
    mana: 0,
    armor: 4,
    armorDurability: 3,
    attack: 6,
    gold: 10
  },
  {
    name: 'basalisk',
    level: 4,
    health: 7,
    mana: 6,
    armor: 5,
    armorDurability: 3,
    attack: 6,
    gold: 10,
    resistance: 'ice',
    specials: [
      {
        effect: 'protect',
        armor: 4,
        durability: 2,
        cost: 2,
        chance: 35
      },
      {
        effect: 'ice',
        duration: 4,
        chance: 30,
        message: '* >> Enemy *name* <div class="tm-c-log__keyword">freezes</div> you motionless'
      }
    ]
  },
  {
    name: 'doppelganger',
    level: 4,
    health: 7,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 6,
    gold: 12,
    weakness: 'water'
  },
  {
    name: 'minotaur',
    level: 4,
    health: 7,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 6,
    gold: 11
  }
];
