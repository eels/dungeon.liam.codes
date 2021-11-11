export default function findCardByColumn(cards, column, value) {
  const iterableCardEntries = Object.entries(cards);

  for (const [index, card] of iterableCardEntries) {
    if (card[column] === value) {
      return [card, index];
    }
  }

  return false;
}
