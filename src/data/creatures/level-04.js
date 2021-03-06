export default [
  {
    armor: 4,
    attack: 6,
    gold: 10,
    health: 7,
    level: 4,
    mana: 0,
    name: 'quaggoth',
  },
  {
    armor: 5,
    attack: 6,
    gold: 10,
    health: 7,
    level: 4,
    mana: 6,
    name: 'basalisk',
    resistance: 'ice',
    specials: [
      {
        armor: 4,
        chance: 0.35,
        cost: 2,
        effect: 'protect',
        message: {
          copy: 'Enemy %1 protects itself',
          direction: 'outbound',
        },
      },
      {
        chance: 0.3,
        duration: 4,
        effect: 'ice',
        message: {
          copy: 'Enemy %1 freezes you motionless',
          direction: 'outbound',
        },
      },
    ],
  },
  {
    armor: 0,
    attack: 6,
    gold: 12,
    health: 7,
    level: 4,
    mana: 0,
    name: 'doppelganger',
    weakness: 'water',
  },
  {
    armor: 0,
    attack: 6,
    gold: 11,
    health: 7,
    level: 4,
    mana: 0,
    name: 'minotaur',
  },
];
