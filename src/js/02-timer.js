import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerContainer = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const dataDaysEl = document.querySelector('span[data-days]');
const dataHoursEl = document.querySelector('span[data-hours]');
const dataMinutesEl = document.querySelector('span[data-minutes]');
const dataSecondsEl = document.querySelector('span[data-seconds]');
let timerId = null;

timerContainer.style.cssText = 'display:flex; gap:15px';
for (const item of timerContainer.children) {
  item.style.cssText =
    'display:flex; align-items:center;;flex-direction:column; text-transform:uppercase;';
  item.firstElementChild.style.cssText = 'font-weight:bold; font-size:32px';
}

btnStart.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.removeAttribute('disabled');

    const showTimer = () => {
      const dateNow = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diffDate = selectData - dateNow;
      const { days, hours, minutes, seconds } = convertMs(diffDate);

      dataDaysEl.textContent = days;
      dataHoursEl.textContent = hours;
      dataMinutesEl.textContent = minutes;
      dataSecondsEl.textContent = seconds;
      console.log(days, hours, minutes, seconds);

      if (
        dataDaysEl.textContent === '0' &&
        dataHoursEl.textContent === '00' &&
        dataMinutesEl.textContent === '00' &&
        dataSecondsEl.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClickStartBtn = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    btnStart.addEventListener('click', onClickStartBtn);
  },
};

flatpickr('#datetime-picker', { ...options });
