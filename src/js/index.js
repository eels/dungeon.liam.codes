import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import Board from 'components/board';
import Creature from 'components/creature';
import Hand from 'components/hand';
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

on('click', '.js-card', event => {
  if (!Player.store.state.actionTaken) {
    Player.playCard(event.selector.getAttribute('data-id'));
  }

  fire('PLAYER_ACTION', { 'PLAYER_ACTION': true });
  document.querySelector('.tm-c-hand').classList.add('tm-c-hand--disabled');
});

on('click', '.toggle', () => {
  fire('TOGGLE_TICK');
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
  /*
  const hit = Player.store.state.hp - Math.round(Math.random() * 5);
  Player.store.commit({ hp: hit > 0 ? hit : 0 });
  fire('PLAYER_UPDATE');
  */
});

Tick.start();
Player.tick();
