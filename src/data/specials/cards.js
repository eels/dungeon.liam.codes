export default [
  {
    effect: 'heal-hp',
    health: 25,
    icon: 'divine',
    message: {
      copy: '"A bright light surrounds you as your health is restored"',
      direction: 'outbound',
    },
    name: 'divine heal',
    price: 15,
    set: 'special',
    size: '14px',
  },
  {
    effect: 'increase-hp',
    icon: 'divine',
    maxHealth: 25,
    message: {
      copy: '"A bright light surrounds you as your total health is increased"',
      direction: 'outbound',
    },
    name: 'divine touch',
    price: 20,
    set: 'special',
    size: '14px',
  },
  {
    effect: 'heal-mp',
    icon: 'divine',
    mana: 25,
    message: {
      copy: '"A bright light surrounds you as your mana is restored"',
      direction: 'outbound',
    },
    name: 'arcane heal',
    price: 15,
    set: 'special',
    size: '14px',
  },
  {
    effect: 'increase-mp',
    icon: 'divine',
    maxMana: 25,
    message: {
      copy: '"A bright light surrounds you as your total mana is increased"',
      direction: 'outbound',
    },
    name: 'arcane touch',
    price: 20,
    set: 'special',
    size: '14px',
  },
];
