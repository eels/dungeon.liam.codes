import StatefulEntity from 'lib/state/StatefulEntity';
import cards from 'data/cards';
import shuffle from 'utilities/shuffle';
import uuid from 'utilities/uuid';

export default class PlayerEntity extends StatefulEntity {
  constructor(player) {
    super(player);

    this.setInitialDeckState();
  }

  setInitialDeckState() {
    this.setState({ availableCards: cards.filter((card) => card.set === 'base') }).commit();
    this.setState({ deck: this.generatePlayableDeck() }).commit();
  }

  generatePlayableDeck() {
    const isDeckEmpty = this.deck === 0;
    const currentHand = this.deck.slice(0, 5);

    if (isDeckEmpty) {
      return this.generateRandomDeckFromAvailableCards(true);
    }

    return [...currentHand, ...this.generateRandomDeckFromAvailableCards(false)];
  }

  generateRandomDeckFromAvailableCards(isFresh) {
    return Array.from(Array(isFresh ? 40 : 35).keys()).map(() => {
      return Object.assign({ id: uuid() }, shuffle(this.availableCards)[0]);
    });
  }
}
