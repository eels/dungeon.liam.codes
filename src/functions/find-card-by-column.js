export default function findCardByColumn(cards, column, value) {
  for (const [index, card] of cards) {
    if (card[column] === value) {
      return [card, index];
    }
  }

  return false;
}
