import { fire } from 'utilities/delegation';
import { nodize } from 'utilities/nodize';
import Timer from 'components/timer';

const resetTimer = () => {
  const timer = document.querySelector('.tm-c-timer');
  timer.parentNode.insertBefore(nodize(Timer()), timer);
  timer.parentNode.removeChild(timer);
};

export { resetTimer };
