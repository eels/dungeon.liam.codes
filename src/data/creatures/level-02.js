export default [
  {
    armor: 0,
    attack: 2,
    gold: 4,
    health: 3,
    level: 2,
    mana: 0,
    name: 'gnoll',
    resistance: 'nature',
    weakness: 'fire',
  },
  {
    armor: 0,
    attack: 2,
    gold: 5,
    health: 3,
    level: 2,
    mana: 6,
    name: 'grey ooze',
    resistance: 'water',
    specials: [
      {
        chance: 0.45,
        cost: 2,
        damage: 3,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 douses you sticky liquid dealing %2 damage',
          direction: 'outbound',
        },
      },
    ],
    weakness: 'electric',
  },
  {
    armor: 2,
    attack: 3,
    gold: 5,
    health: 3,
    level: 2,
    mana: 0,
    name: 'orc warrior',
    specials: [
      {
        chance: 0.4,
        damage: 3,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 charges at you dealing %2 damage',
          direction: 'outbound',
        },
      },
      {
        chance: 0.15,
        damage: 4,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 goes beserk hitting you for %2 damage',
          direction: 'outbound',
        },
      },
    ],
  },
  {
    armor: 1,
    attack: 3,
    gold: 5,
    health: 4,
    level: 2,
    mana: 0,
    name: 'worg',
    specials: [
      {
        chance: 0.2,
        damage: 4,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 bites you dealing %2 damage',
          direction: 'outbound',
        },
      },
      {
        chance: 0.2,
        damage: 4,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 claws you dealing %2 damage',
          direction: 'outbound',
        },
      },
    ],
  },
  {
    armor: 2,
    attack: 4,
    gold: 5,
    health: 4,
    level: 2,
    mana: 0,
    name: 'bugbear',
    specials: [
      {
        chance: 0.45,
        damage: 5,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 launches a surprise attack dealing %2 damage',
          direction: 'outbound',
        },
      },
    ],
  },
  {
    armor: 0,
    attack: 3,
    gold: 5,
    health: 4,
    level: 2,
    mana: 5,
    name: 'nilbog',
    specials: [
      {
        chance: 0.3,
        cost: 2,
        damage: 4,
        effect: 'damage',
        element: 'fire',
        message: {
          copy: 'Enemy %1 projects a fireball dealing %2 damage',
          direction: 'outbound',
        },
      },
      {
        chance: 0.3,
        damage: 4,
        effect: 'damage',
        element: 'electric',
        message: {
          copy: 'Enemy %1 shocks you for %2 damage',
          direction: 'outbound',
        },
      },
      {
        chance: 0.3,
        cost: 1,
        duration: 2,
        effect: 'poison',
        message: {
          copy: 'Enemy %1 releases a sickening poison',
          direction: 'outbound',
        },
      },
    ],
    weakness: 'fire',
  },
];
