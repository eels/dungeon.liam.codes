import { shuffle } from 'utilities/array';
import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import { applyCardEffect } from 'functions/card-effects';
import { addToDiscard } from 'functions/discard';
import Timer from 'components/timer';
import Store from 'utilities/store';

import Cards from 'library/cards';

export default class {
  constructor(TickInstance) {
    this.store = new Store({
      actionTaken: false,
      status: 'ticking',
      deck: [],
      gold: 0,
      hp: 50,
      maxHp: 50,
      mp: 50,
      maxMp: 50
    });

    this.TickInstance = TickInstance;
    this.store.commit({ deck: this.generateDeck() });
  }

  tick() {
    setInterval(() => {
      const timer = document.querySelector('.tm-c-timer');
      const width = parseFloat(timer.style.width) + (100 / (this.TickInstance.store.state.length / 50));

      if (this.store.state.status === 'paused' || this.store.state.status === 'staged') {
        return;
      }

      if (width > 100) {
        timer.parentNode.insertBefore(nodize(Timer()), timer);
        timer.parentNode.removeChild(timer);
        fire('PLAYER_ACTION', { 'PLAYER_ACTION': false });
        document.querySelector('.tm-c-hand').classList.remove('tm-c-hand--disabled');
      } else {
        timer.style.width = `${width}%`;
      }
    }, 50);

    on('TICK', 'body', event => {
      if (this.store.state.status === 'staged') {
        this.store.commit({ status: 'ticking' });
      }
    });
  }

  generateDeck() {
    return Array.apply(null, Array(40)).map(() => {
      const shuffledCards = shuffle(Cards);
      const card = Object.assign({}, shuffledCards[0]);
      card.id = Math.round(Math.random() * (999999999 - 100000000) + 100000000);
      return card;
    });
  }

  playCard(id) {
    const deck = this.store.state.deck.slice(0);
    let found = false;
    let errors = false;
    let played;

    deck.forEach((card, i) => {
      if (card.id !== parseInt(id) || found) {
        return;
      }

      found = true;
      played = card;

      if (played.cost) {
        if (this.store.state.mp - played.cost < 0) {
          errors = true;
          return;
        } else {
          this.store.commit({ mp: this.store.state.mp - played.cost });
          fire('PLAYER_UPDATE');
        }
      }

      deck.splice(i, 1)
      deck.push(card);
    });

    if (errors) {
      return;
    }

    addToDiscard();
    applyCardEffect(played);

    this.store.commit({ deck: deck });
    fire('PLAYER_UPDATE_HAND', { 'discard': document.querySelector('.js-discard').children });
  }
};
