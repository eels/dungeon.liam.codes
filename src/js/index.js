import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import Board from 'components/board';
import Stats from 'components/stats';
import Timer from 'components/timer';
import Title from 'components/title';
import { Player } from 'instances/player';
import { Tick } from 'instances/tick';

const field = document.getElementById('dungeon');

field.appendChild(nodize(Title('Title')));
field.appendChild(nodize(Board()));
field.appendChild(nodize(Stats()));

field.insertAdjacentHTML('beforeend', '<input type="button" class="action" value="Click" style="color: black" />');
field.insertAdjacentHTML('beforeend', '<input type="button" class="toggle" value="Toggle" style="color: black" />');
field.insertAdjacentHTML('beforeend', `<div class="flag">${Player.store.state.actionTaken}</div>`);

on('click', '.action', () => {
  fire('PLAYER_ACTION', { 'PLAYER_ACTION': true });
});

on('click', '.toggle', () => {
  fire('TOGGLE_TICK');
});

on('PLAYER_ACTION', 'body', event => {
  Player.store.commit({ actionTaken: event.detail.PLAYER_ACTION });
  document.querySelector('.flag').innerHTML = Player.store.state.actionTaken;
});

on('PLAYER_UPDATE', 'body', event => {
  document.querySelector('.tm-c-stats').outerHTML = Stats();
  document.body.classList.add('tm-c-body--hit');
  setTimeout(() => {
    document.body.classList.remove('tm-c-body--hit');
  }, 200);
});

on('TOGGLE_TICK', 'body', event => {
  Player.store.commit({ status: Player.store.state.status === 'ticking' ? 'paused': 'staged' });
});

on('TICK', 'body', event => {
  const hit = Player.store.state.hp - Math.round(Math.random() * 10);
  Player.store.commit({ hp: hit > 0 ? hit : 0 });
  fire('PLAYER_UPDATE');
});

Tick.process();
Player.tick();
