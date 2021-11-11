export default [
  {
    armor: 0,
    armorDurability: 0,
    attack: 4,
    gold: 5,
    health: 6,
    level: 3,
    mana: 0,
    name: 'giant spider',
    resistance: 'poison',
    specials: [
      {
        chance: 40,
        duration: 3,
        effect: 'poison',
        message:
          '* >> Enemy *name* shoots a <div class="tm-c-log__keyword">poison</div> web at you',
      },
      {
        chance: 20,
        damage: 5,
        effect: 'damage',
        message: '* >> Enemy *name* bites you dealing *damage* damage',
      },
    ],
    weakness: 'fire',
  },
  {
    armor: 0,
    armorDurability: 0,
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
    armorDurability: 2,
    attack: 4,
    gold: 4,
    health: 4,
    level: 3,
    mana: 6,
    name: 'gargoyle',
    resistance: 'poison',
    specials: [
      {
        chance: 30,
        cost: 1,
        damage: 5,
        effect: 'damage',
        element: 'nature',
        message: '* >> Enemy *name* throws stone at you for *damage* damage',
      },
      {
        chance: 40,
        duration: 3,
        effect: 'ice',
        message: '* >> Enemy *name* <div class="tm-c-log__keyword">freezes</div> you motionless',
      },
      {
        armor: 2,
        chance: 45,
        cost: 1,
        durability: 1,
        effect: 'protect',
      },
    ],
  },
  {
    armor: 0,
    armorDurability: 0,
    attack: 1,
    gold: 7,
    health: 6,
    level: 3,
    mana: 6,
    name: 'mimic',
    specials: [
      {
        chance: 45,
        damage: 2,
        effect: 'damage',
        message: '* >> Enemy *name* bites you for *damage* damage',
      },
      {
        chance: 30,
        cost: 2,
        damage: 2,
        effect: 'damage',
        message: '* >> Enemy *name* transforms and hits you for *damage* damage',
      },
      {
        armor: 4,
        chance: 15,
        durability: 3,
        effect: 'protect',
      },
    ],
  },
];