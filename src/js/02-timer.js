// Import library flatpickr
import flatpickr from 'flatpickr';
// Optional import of styles
import 'flatpickr/dist/flatpickr.min.css';
// Import method from library notifix
import { Report } from 'notiflix/build/notiflix-report-aio';
// Get refs
const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
};
// Receiving an event on click
refs.startBtn.addEventListener('click', onClick, { once: true });
let difference;
// Options from flatpickr init
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      refs.startBtn.setAttribute('disabled', '');
      Report.warning(
        'Incorrect Date',
        'Please choose a date in the future',
        'Okay'
      );
    } else {
      getDifferentTime(selectedDates[0].getTime());
    }
  },
};
// Init library
flatpickr(refs.inputEl, options);

function onClick() {
  // Show timer
  setInterval(() => setTimeToHTML(convertMs(difference)), 1000);
}

function getDifferentTime(setTime) {
  refs.startBtn.removeAttribute('disabled');
  const intervalId = setInterval(() => {
    difference = new Date(setTime) - Date.now();
    if (difference < 1000) {
      clearInterval(intervalId);
      return;
    }
  }, 1000);
}

function setTimeToHTML({ days, hours, minutes, seconds }) {
  // Set days, hours, minutes, seconds to timer
  refs.timerEl.children[0].querySelector('.value').innerText =
    addLeadingZero(days);
  refs.timerEl.children[1].querySelector('.value').innerText =
    addLeadingZero(hours);
  refs.timerEl.children[2].querySelector('.value').innerText =
    addLeadingZero(minutes);
  refs.timerEl.children[3].querySelector('.value').innerText =
    addLeadingZero(seconds);
}

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

function addLeadingZero(value) {
  //adding "0"
  return String(value).padStart(2, '0');
}
