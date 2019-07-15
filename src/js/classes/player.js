import { shuffle } from 'utilities/array';
import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import { applyCardEffect } from 'functions/card-effects';
import { addToDiscard } from 'functions/discard';
import Timer from 'components/timer';
import Store from 'utilities/store';

import Cards from 'library/cards';

export default class {
  constructor(TickInstance, state) {
    this.store = new Store(state);
    this.TickInstance = TickInstance;
    this.store.commit({ deck: this.generateDeck() });
  }

  start() {
    this.tick();
    this.bindCardEvent();
  }

  tick() {
    on('TICK_SEGMENT', 'body', event => {
      const timer = document.querySelector('.tm-c-timer');
      const currentWidth = parseFloat(timer.style.width);
      const increment = ((100 / (this.TickInstance.store.state.length / 50) * 100)) / 100;
      const width = currentWidth + increment;

      if (this.store.state.status === 'paused' || this.store.state.status === 'staged') {
        return;
      }

      timer.style.width = `${width}%`;
    });

    on('TICK', 'body', event => {
      if (this.store.state.status === 'staged') {
        this.store.commit({ status: 'ticking' });
      }

      if (this.store.state.status !== 'paused' && this.store.state.status !== 'staged') {
        const timer = document.querySelector('.tm-c-timer');
        timer.parentNode.insertBefore(nodize(Timer()), timer);
        timer.parentNode.removeChild(timer);
        fire('PLAYER_ACTION', { 'PLAYER_ACTION': false });
        document.querySelector('.tm-c-hand').classList.remove('tm-c-hand--disabled');
      }
    });
  }

  bindCardEvent() {
    on('click', '.js-card', event => {
      if (!this.store.state.actionTaken) {
        this.playCard(event.selector.getAttribute('data-id'));
      }

      fire('PLAYER_ACTION', { 'PLAYER_ACTION': true });
      document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
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
          fire('PLAYER_UPDATE_STATS');
        }
      }

      deck.splice(i, 1)
      deck.push(card);
    });

    if (errors) {
      return;
    }

    addToDiscard();
    this.store.commit({ deck: deck });

    applyCardEffect(played);
    fire('PLAYER_UPDATE_HAND', { 'discard': document.querySelector('.js-discard').children });
  }
};
