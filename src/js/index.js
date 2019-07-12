import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import Board from 'components/board';
import Creature from 'components/creature';
import DeathScreen from 'components/death-screen';
import Hand from 'components/hand';
import StartScreen from 'components/start-screen';
import Stats from 'components/stats';
import Timer from 'components/timer';
import Title from 'components/title';

import { Dungeon } from 'instances/dungeon';
import { Player } from 'instances/player';
import { Tick } from 'instances/tick';

const field = document.getElementById('dungeon');

field.appendChild(nodize(Title('Dungeon Delver')));
field.appendChild(nodize(Board()));
field.appendChild(nodize(Stats()));

document.querySelector('.tm-c-stats').classList.add('tm-c-stats--disabled');

on('click', '.js-card', event => {
  if (!Player.store.state.actionTaken) {
    Player.playCard(event.selector.getAttribute('data-id'));
  }

  fire('PLAYER_ACTION', { 'PLAYER_ACTION': true });
  document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
});

on('click', '.js-restart', () => {
  window.location.href = window.location.href;
});

on('click', '.js-start', () => {
  document.querySelector('.tm-c-board__message').classList.remove('tm-c-board__message--active');
  document.querySelector('.tm-c-stats').classList.remove('tm-c-stats--disabled');
  Tick.start();
  Player.tick();
});

on('PLAYER_ACTION', 'body', event => {
  Player.store.commit({ actionTaken: event.detail.PLAYER_ACTION });
});

on('PLAYER_UPDATE', 'body', event => {
  document.querySelector('.tm-c-stats').outerHTML = Stats();
});

on('CREATURE_UPDATE', 'body', event => {
  document.querySelector('.tm-c-creature').outerHTML = Creature();
});

on('PLAYER_UPDATE_HAND', 'body', event => {
  const hand = document.querySelector('.tm-c-hand');
  hand.outerHTML = Hand();
  Array.from(event.detail.discard).map(card => document.querySelector('.js-discard').appendChild(card));
});

on('TOGGLE_TICK', 'body', event => {
  Player.store.commit({ status: Player.store.state.status === 'ticking' ? 'paused': 'staged' });
});

on('TICK', 'body', event => {
  const creature = Dungeon.store.state.creatures[0];

  if (creature.store.state.status === 'frozen') {
    const duration = creature.store.state.statusDuration - 1;
    creature.store.commit({ statusDuration: duration });

    if (duration > 0) {
      return;
    }

    creature.store.commit({ status: 'active' });
    fire('CREATURE_UPDATE');
  }

  const hit = Player.store.state.hp - creature.store.state.raw.attack;
  Player.store.commit({ hp: hit > 0 ? hit : 0 });
  fire('PLAYER_UPDATE');

  if (hit <= 0) {
    Tick.stop();
    Player.store.commit({ status: 'paused' });
    Player.store.commit({ actionTaken: true });
    document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
    document.querySelector('.tm-c-stats').classList.add('tm-c-stats--disabled');
    document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');
    document.querySelector('.tm-c-message__container').innerHTML = DeathScreen();
  }
});

document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');
document.querySelector('.tm-c-message__container').innerHTML = StartScreen();
