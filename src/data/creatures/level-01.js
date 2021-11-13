export default [
  {
    armor: 1,
    attack: 1,
    gold: 2,
    health: 1,
    level: 1,
    mana: 0,
    name: 'swarm of rats',
    specials: [
      {
        chance: 0.45,
        cost: 1,
        damage: 2,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 engulfs your body dealing %2 damage',
          direction: 'outbound',
        },
      },
    ],
    weakness: 'fire',
  },
  {
    armor: 0,
    attack: 1,
    gold: 3,
    health: 1,
    level: 1,
    mana: 0,
    name: 'kobold',
  },
  {
    armor: 0,
    attack: 2,
    gold: 3,
    health: 2,
    level: 1,
    mana: 0,
    name: 'goblin',
    weakness: 'fire',
  },
  {
    armor: 2,
    attack: 2,
    gold: 3,
    health: 2,
    level: 1,
    mana: 4,
    name: 'skeleton',
    resistance: 'poison',
    specials: [
      {
        chance: 0.4,
        damage: 2,
        effect: 'damage',
        message: {
          copy: 'Enemy %1 flings a bone at you dealing %2 damage',
          direction: 'outbound',
        },
      },
      {
        chance: 0.2,
        cost: 1,
        duration: 2,
        effect: 'poison',
        message: {
          copy: 'Enemy %1 releases a scent of death giving you poison',
          direction: 'outbound',
        },
      },
    ],
  },
];
