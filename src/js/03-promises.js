import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);
  let position = 1;

    const intervalId = setInterval(() => {
      
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

      position++;

    if (position > amount) {
      clearInterval(intervalId);
    } else {
      delay += step;
    }
  }, delay);
  
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  const promise = { position, delay };

  if (shouldResolve) {
    return Promise.resolve(promise);
  } else {
    return Promise.reject(promise);
  }
}
