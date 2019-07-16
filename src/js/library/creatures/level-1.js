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
        chance: 20,
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
    armor: 2,
    armorDurability: 3,
    attack: 3,
    gold: 4,
    resistance: 'poison',
    specials: [
      {
        effect: 'damage',
        damage: 4,
        chance: 40,
        message: '* >> Enemy *name* flings a bone at you dealing *damage* damage'
      }
    ]
  }
];
