export default [
  {
    name: 'gnoll',
    level: 2,
    health: 3,
    mana: 0,
    armor: 0,
    armorDurability: 0,
    attack: 2,
    gold: 4,
    weakness: 'fire',
    resistance: 'nature'
  },
  {
    name: 'grey ooze',
    level: 2,
    health: 3,
    mana: 6,
    armor: 0,
    armorDurability: 0,
    attack: 2,
    gold: 5,
    weakness: 'electric',
    resistance: 'water',
    specials: [
      {
        effect: 'damage',
        damage: 3,
        cost: 2,
        chance: 45,
        message: '* >> Enemy *name* douses you sticky liquid dealing *damage* damage'
      }
    ]
  },
  {
    name: 'orc warrior',
    level: 2,
    health: 3,
    mana: 0,
    armor: 2,
    armorDurability: 2,
    attack: 3,
    gold: 5,
    specials: [
      {
        effect: 'damage',
        damage: 3,
        chance: 40,
        message: '* >> Enemy *name* charges at you dealing *damage* damage'
      },
      {
        effect: 'damage',
        damage: 4,
        chance: 15,
        message: '* >> Enemy *name* goes beserk hitting you for *damage* damage'
      }
    ]
  },
  {
    name: 'worg',
    level: 2,
    health: 4,
    mana: 0,
    armor: 1,
    armorDurability: 1,
    attack: 3,
    gold: 5,
    specials: [
      {
        effect: 'damage',
        damage: 4,
        chance: 20,
        message: '* >> Enemy *name* bites you dealing *damage* damage'
      },
      {
        effect: 'damage',
        damage: 4,
        chance: 20,
        message: '* >> Enemy *name* claws you dealing *damage* damage'
      }
    ]
  },
  {
    name: 'bugbear',
    level: 2,
    health: 4,
    mana: 0,
    armor: 2,
    armorDurability: 1,
    attack: 4,
    gold: 5,
    specials: [
      {
        effect: 'damage',
        damage: 5,
        chance: 45,
        message: '* >> Enemy *name* launches a surprise attack dealing *damage* damage'
      }
    ]
  },
  {
    name: 'nilbog',
    level: 2,
    health: 4,
    mana: 5,
    armor: 0,
    armorDurability: 0,
    attack: 3,
    gold: 5,
    weakness: 'fire',
    specials: [
      {
        effect: 'damage',
        damage: 4,
        element: 'fire',
        chance: 30,
        message: '* >> Enemy *name* projects a fireball dealing *damage* damage'
      },
      {
        effect: 'damage',
        damage: 4,
        element: 'electric',
        chance: 30,
        message: '* >> Enemy *name* shocks you for *damage* damage'
      },
      {
        effect: 'poison',
        duration: 2,
        chance: 30,
        message: '* >> Enemy *name* releases a sickening <div class="tm-c-log__keyword">poison</div>'
      }
    ]
  }
];
