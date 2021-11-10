import Dungeon from 'instances/Dungeon';
import cards from 'data/cards';
import shuffle from 'utilities/shuffle';

export default function getRandomCardArray(total) {
  const pool = cards.filter((card) => card.set <= Dungeon.level);
  const shuffled = shuffle(pool);
  const selectedCards = shuffled.slice(0, total);

  return selectedCards.sort((a, b) => a.price - b.price);
}
