import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const body = document.querySelector('body');

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

function hideMessage(){
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onEscKeyDown);
}

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  document.addEventListener('keydown', onEscKeyDown);
  successButton.addEventListener('click', hideMessage);
  body.append(successMessage);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  document.addEventListener('keydown', onEscKeyDown);
  errorButton.addEventListener('click', hideMessage);
  body.append(errorMessage);
};

export {showSuccessMessage, showErrorMessage};
