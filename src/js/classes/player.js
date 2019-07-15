import { shuffle } from 'utilities/array';
import { fire } from 'utilities/delegation';
import Store from 'utilities/store';
import Cards from 'library/cards';

export default class {
  constructor(state) {
    this.store = new Store(state);
    this.store.commit({ deck: this.generateDeck() });
  }

  generateDeck() {
    return Array.apply(null, Array(40)).map(() => {
      const shuffledCards = shuffle(Cards);
      const card = Object.assign({}, shuffledCards[0]);
      card.id = Math.round(Math.random() * (999999999 - 100000000) + 100000000);
      return card;
    });
  }
};
