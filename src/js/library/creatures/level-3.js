export default [
  {
    name: 'giant spider',
    level: 3,
    health: 10,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 6,
    gold: 7,
    weakness: 'fire',
    resistance: 'poison',
    specials: [
      {
        effect: 'poison',
        duration: 4,
        chance: 40,
        message: '* >> Enemy *name* shoots a <div class="tm-c-log__keyword">poison</div> web at you'
      },
      {
        effect: 'damage',
        damage: 7,
        chance: 20,
        message: '* >> Enemy *name* bites you dealing *damage* damage'
      }
    ]
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
    mana: 6,
    armor: 2,
    armorDurability: 2,
    attack: 6,
    gold: 4,
    resistance: 'poison',
    specials: [
      {
        effect: 'damage',
        damage: 8,
        cost: 1,
        element: 'nature',
        chance: 30,
        message: '* >> Enemy *name* throws stone at you for *damage* damage'
      },
      {
        effect: 'ice',
        duration: 4,
        chance: 40,
        message: '* >> Enemy *name* <div class="tm-c-log__keyword">freezes</div> you motionless'
      },
      {
        effect: 'protect',
        armor: 2,
        durability: 2,
        cost: 1,
        chance: 45
      }
    ]
  },
  {
    name: 'mimic',
    level: 3,
    health: 15,
    mana: 6,
    armor: 0,
    armorDurability: 0,
    attack: 1,
    gold: 15,
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
        message: '* >> Enemy *name* transforms into a hammer and hits you for *damage* damage'
      },
      {
        effect: 'protect',
        armor: 5,
        durability: 3,
        chance: 10
      }
    ]
  }
];
