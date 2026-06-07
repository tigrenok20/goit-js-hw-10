// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

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

let userSelectedDate;
const startButton = document.querySelector('.timer-container button');
startButton.disabled = true;
const datetimePicker = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('span.value[data-days]');
const hoursElement = document.querySelector('span.value[data-hours]');
const minutesElement = document.querySelector('span.value[data-minutes]');
const secondsElement = document.querySelector('span.value[data-seconds]');

function isLessOrEqualNow() {
  return userSelectedDate <= new Date();
}

function handleSelectDate(date) {
  userSelectedDate = date;
  startButton.disabled = isLessOrEqualNow();
  if (isLessOrEqualNow()) {
    iziToast.error({ message: 'Please choose a date in the future' });
  }
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function updateDisplay() {
  const values = convertMs(
    userSelectedDate ? userSelectedDate.getTime() - Date.now() : 0
  );
  daysElement.textContent = addLeadingZero(String(values.days));
  hoursElement.textContent = addLeadingZero(String(values.hours));
  minutesElement.textContent = addLeadingZero(String(values.minutes));
  secondsElement.textContent = addLeadingZero(String(values.seconds));
}

startButton.addEventListener('click', () => {
  if (!isLessOrEqualNow()) {
    startButton.disabled = true;
    datetimePicker.disabled = true;
    const interval = setInterval(() => {
      if (isLessOrEqualNow()) {
        clearInterval(interval);
        datetimePicker.disabled = false;
        userSelectedDate = undefined;
      }

      updateDisplay();
    }, 1000);
  }
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleSelectDate(selectedDates[0]);
  },
};
flatpickr(datetimePicker, options);
