import throttle from 'lodash.throttle';

const refs = {
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

const formData = {};

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fromStorageToForm(keys, dataLocalStorage) {
  for (const key of keys) {
    formData[key] = dataLocalStorage[key];
    refs[key].value = dataLocalStorage[key];
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (formData.email === undefined || formData.message === undefined) {
    return alert('Напиши щось в кожному полі');
  } else if (formData.email === ' ' || formData.message === ' ') {
    return alert('Напиши щось в кожному полі');
  }
  evt.target.reset();
  localStorage.removeItem('feedback-form-state');

  console.log(formData);

  delete formData.email;
  delete formData.message;
}

if (localStorage.getItem('feedback-form-state')) {
  const parsedLocalStorage = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  const keys = Object.keys(parsedLocalStorage);

  fromStorageToForm(keys, parsedLocalStorage);
}
