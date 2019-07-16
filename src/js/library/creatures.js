export default [
  {
    name: 'kobold',
    level: 1,
    health: 6,
    mana: 5,
    attack: 2,
    gold: 4,
    weakness: 'fire'
  },
  {
    name: 'goblin',
    level: 2,
    health: 10,
    mana: 5,
    attack: 3,
    gold: 4
  },
  {
    name: 'beholder',
    level: 3,
    health: 7,
    mana: 5,
    attack: 1,
    gold: 6,
    weakness: 'water',
    specials: [
      {
        effect: 'burn',
        duration: 2,
        element: 'fire',
        chance: 70
      }
    ]
  }
];
