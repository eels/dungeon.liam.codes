import { on, fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import Dispatcher from 'dispatcher';
import Board from 'components/board';
import StartScreen from 'components/start-screen';
import Stats from 'components/stats';
import Title from 'components/title';

const field = document.getElementById('dungeon');
field.appendChild(nodize(Title('Dungeon Delver')));
field.appendChild(nodize(Board()));
field.appendChild(nodize(Stats()));

Dispatcher();

document.querySelector('.tm-c-footer').classList.add('tm-c-footer--active');
document.querySelector('.tm-c-stats').classList.add('tm-c-stats--disabled');
document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');
document.querySelector('.tm-c-message__container').innerHTML = StartScreen();
