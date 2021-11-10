import Timer from 'components/Timer';
import nodize from 'utilities/nodize';

export default function resetTimer() {
  const timer = document.querySelector('.tm-c-timer');

  timer.parentNode.insertBefore(nodize(Timer()), timer);
  timer.parentNode.removeChild(timer);
}
