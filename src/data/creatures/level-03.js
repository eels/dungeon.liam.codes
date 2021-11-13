export default [
  {
    armor: 0,
    attack: 4,
    gold: 5,
    health: 6,
    level: 3,
    mana: 0,
    name: 'giant spider',
    resistance: 'poison',
    specials: [
      {
        chance: 0.4,
        duration: 3,
        effect: 'poison',
        message: {
          copy: 'Enemy %1 shoots a poison web at you',
          direction: 'outbound',
        },
      },
      {
        chance: 0.2,
        damage: 5,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 bites you dealing %2 damage',
          direction: 'outbound',
        },
      },
    ],
    weakness: 'fire',
  },
  {
    armor: 0,
    attack: 5,
    gold: 5,
    health: 6,
    level: 3,
    mana: 5,
    name: 'harpy',
    resistance: 'poison',
    weakness: 'fire',
  },
  {
    armor: 2,
    attack: 4,
    gold: 4,
    health: 4,
    level: 3,
    mana: 6,
    name: 'gargoyle',
    resistance: 'poison',
    specials: [
      {
        chance: 0.3,
        cost: 2,
        damage: 5,
        effect: 'damage',
        element: 'nature',
        message: {
          copy: 'Enemy %1 throws stone at you for %2 damage',
          direction: 'outbound',
        },
      },
      {
        chance: 0.4,
        cost: 3,
        duration: 3,
        effect: 'ice',
        message: {
          copy: 'Enemy %1 freezes you motionless',
          direction: 'outbound',
        },
      },
      {
        armor: 2,
        chance: 0.45,
        cost: 2,
        effect: 'protect',
        message: {
          copy: 'Enemy %1 protects itself',
          direction: 'outbound',
        },
      },
    ],
  },
  {
    armor: 0,
    attack: 1,
    gold: 7,
    health: 6,
    level: 3,
    mana: 6,
    name: 'mimic',
    specials: [
      {
        chance: 0.45,
        damage: 2,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 bites you for %2 damage',
          direction: 'outbound',
        },
      },
      {
        chance: 0.3,
        cost: 2,
        damage: 2,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 transforms and hits you for %2 damage',
          direction: 'outbound',
        },
      },
      {
        armor: 4,
        chance: 0.15,
        effect: 'protect',
        message: {
          copy: 'Enemy %1 protects itself',
          direction: 'outbound',
        },
      },
    ],
  },
];
