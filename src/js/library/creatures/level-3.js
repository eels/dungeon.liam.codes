export default [
  {
    name: 'giant spider',
    level: 3,
    health: 10,
    mana: 9,
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
        cost: 3,
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
    resistance: 'electric',
    specials: [
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
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 1,
    gold: 15
  }
];
