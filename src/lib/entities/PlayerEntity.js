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
    return Array.from(Array(40).keys()).map(() => {
      return Object.assign({ id: uuid() }, shuffle(this.availableCards)[0]);
    });
  }
}
