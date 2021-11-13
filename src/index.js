import Board from 'components/Board';
import StartScreen from 'components/StartScreen';
import Stats from 'components/Stats';
import Title from 'components/Title';
import nodize from 'utilities/nodize';
import register from 'events/register';

const field = document.getElementById('dungeon');

field.appendChild(nodize(Title('Dungeon Delver')));
field.appendChild(nodize(Board()));
field.appendChild(nodize(Stats()));

document.querySelector('.tm-c-footer').classList.add('tm-c-footer--active');
document.querySelector('.tm-c-board__message').classList.add('tm-c-board__message--active');
document.querySelector('.tm-c-message__container').innerHTML = StartScreen();

register();
