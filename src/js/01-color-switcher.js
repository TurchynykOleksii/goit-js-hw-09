const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeRandomColorStart() {
  btnStop.disabled = false;
  btnStart.disabled = true;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onChangeRandomColorStop() {
  btnStop.disabled = true;
  btnStart.disabled = false;

  clearInterval(timerId);
}

btnStart.addEventListener('click', onChangeRandomColorStart);
btnStop.addEventListener('click', onChangeRandomColorStop);
