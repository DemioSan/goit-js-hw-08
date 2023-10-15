import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

const saveToLocalStorage = () => {
  const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
};

const restoreFromLocalStorage = () => {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageTextarea.value = state.message;
  }
};

document.addEventListener('DOMContentLoaded', restoreFromLocalStorage);

emailInput.addEventListener('input', throttle(saveToLocalStorage, 500));
messageTextarea.addEventListener('input', throttle(saveToLocalStorage, 500));

form.addEventListener('submit', event => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const messageValue = messageTextarea.value;

  if (emailValue === '' || messageValue === '') {
    alert('Будь ласка, заповніть всі поля форми.');
  } else {
    const formData = {
      email: emailValue,
      message: messageValue,
    };

    console.log(formData);
    localStorage.removeItem(storageKey);

    emailInput.value = '';
    messageTextarea.value = '';
  }
});
