import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const isFullfill = form.elements['state'].value === 'fulfilled';
  const delay = form.elements['delay'].value;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFullfill) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay =>
      iziToast.success({ message: `Fulfilled promise in ${delay}ms` })
    )
    .catch(delay =>
      iziToast.error({ message: `Rejected promise in ${delay}ms` })
    );
});
