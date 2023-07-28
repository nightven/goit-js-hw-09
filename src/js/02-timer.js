// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
//імпорт методада з бібліотеки notifix
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button'),
  timerEl: document.querySelector('.timer'),
};

refs.startBtn.addEventListener('click', onClick, { once: true });
let difference;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Report.warning(
        'Incorrect Date',
        'Please choose a date in the future',
        'Okay'
      );
    } else {
      refs.startBtn.removeAttribute('disabled');
      const intervalId = setInterval(() => {
        difference = new Date(selectedDates[0]).getTime() - Date.now();
        if (difference === 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  },
};

flatpickr(refs.inputEl, options);

function onClick() {
  setInterval(() => setTimeToHTML(convertMs(difference)), 1000);
}

function setTimeToHTML({ days, hours, minutes, seconds }) {
  refs.timerEl.children[0].querySelector('.value').innerText = days;
  refs.timerEl.children[1].querySelector('.value').innerText = hours;
  refs.timerEl.children[2].querySelector('.value').innerText = minutes;
  refs.timerEl.children[3].querySelector('.value').innerText = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
