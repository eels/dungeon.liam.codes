function createTimer() {
  const timer = document.createElement('div');
  timer.style.width = '0';
  timer.style.height = '10px';
  timer.style.backgroundColor = '#1f1f1f';
  timer.style.transition = 'width 0.1s linear';
  timer.classList.add('timer');
  return timer;
}

const timer = createTimer();

document.body.appendChild(timer);

let actionTaken = false;

setInterval(() => {
  const timer = document.querySelector('.timer');
  const width = parseInt(timer.style.width) + 1;

  if (width > 100) {
    timer.parentNode.removeChild(timer);
    document.body.appendChild(createTimer());
    actionTaken = false;
    document.querySelector('.flag').innerHTML = actionTaken.toString();
  } else {
    timer.style.width = `${width}%`;
  }
}, 50);

const input = document.createElement('input');
input.type = 'button';
input.value = 'Take Action';
input.classList.add('input');

document.body.appendChild(input);

document.querySelector('.input').addEventListener('click', function() {
  if (actionTaken) {
    return;
  }

  actionTaken = true;
  document.querySelector('.flag').innerHTML = actionTaken.toString();
});

const flag = document.createElement('div');
flag.innerHTML = actionTaken.toString();
flag.classList.add('flag');

document.body.appendChild(flag);
