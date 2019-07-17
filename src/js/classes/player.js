import { shuffle } from 'utilities/array';
import Store from 'utilities/store';
import Cards from 'library/cards';

export default class {
  constructor(state) {
    this.store = new Store(state);
    this.store.commit({ availableCards: Cards.filter(card => card.price === undefined) });
    this.store.commit({ deck: this.generateDeck() });
  }

  generateDeck() {
    return Array.apply(null, Array(40)).map(() => {
      const shuffledCards = shuffle(this.store.state.availableCards);
      const card = Object.assign({}, shuffledCards[0]);
      card.id = Math.round(Math.random() * (999999999 - 100000000) + 100000000);
      return card;
    });
  }
};
