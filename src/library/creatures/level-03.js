export default [
  {
    name: 'giant spider',
    level: 3,
    health: 6,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 4,
    gold: 5,
    weakness: 'fire',
    resistance: 'poison',
    specials: [
      {
        effect: 'poison',
        duration: 3,
        chance: 40,
        message: '* >> Enemy *name* shoots a <div class="tm-c-log__keyword">poison</div> web at you'
      },
      {
        effect: 'damage',
        damage: 5,
        chance: 20,
        message: '* >> Enemy *name* bites you dealing *damage* damage'
      }
    ]
  },
  {
    name: 'harpy',
    level: 3,
    health: 6,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 5,
    gold: 5,
    weakness: 'fire',
    resistance: 'poison'
  },
  {
    name: 'gargoyle',
    level: 3,
    health: 4,
    mana: 6,
    armor: 2,
    armorDurability: 2,
    attack: 4,
    gold: 4,
    resistance: 'poison',
    specials: [
      {
        effect: 'damage',
        damage: 5,
        cost: 1,
        element: 'nature',
        chance: 30,
        message: '* >> Enemy *name* throws stone at you for *damage* damage'
      },
      {
        effect: 'ice',
        duration: 3,
        chance: 40,
        message: '* >> Enemy *name* <div class="tm-c-log__keyword">freezes</div> you motionless'
      },
      {
        effect: 'protect',
        armor: 2,
        durability: 1,
        cost: 1,
        chance: 45
      }
    ]
  },
  {
    name: 'mimic',
    level: 3,
    health: 6,
    mana: 6,
    armor: 0,
    armorDurability: 0,
    attack: 1,
    gold: 7,
    specials: [
      {
        effect: 'damage',
        damage: 2,
        chance: 45,
        message: '* >> Enemy *name* bites you for *damage* damage'
      },
      {
        effect: 'damage',
        damage: 2,
        cost: 2,
        chance: 30,
        message: '* >> Enemy *name* transforms and hits you for *damage* damage'
      },
      {
        effect: 'protect',
        armor: 4,
        durability: 3,
        chance: 15
      }
    ]
  }
];
