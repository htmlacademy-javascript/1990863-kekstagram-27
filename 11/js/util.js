const ALERT_SHOW_TIME = 5000;

const generateId = () => {
  let currentId = 0;
  return function() {
    currentId++;
    return currentId;
  };
};

function getRandomPositiveInteger(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.round(Math.random() * (upper - lower) + lower);
  return Math.floor(result);
}
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const alertContainer = () => {
  const container = document.createElement('div');
  container.style.zIndex = '100';
  container.style.position = 'absolute';
  container.style.left = '0';
  container.style.top = '0';
  container.style.right = '0';
  container.style.padding = '10px 3px';
  container.style.fontSize = '22px';
  container.style.textAlign = 'center';

  return container;
};

const showAlertContainer = (message, currentWindow) => {
  currentWindow.textContent = message;

  document.body.append(currentWindow);

  setTimeout(() => {
    currentWindow.remove();
  }, ALERT_SHOW_TIME);
};

const showAlertSuccess = (message) => {
  const alertSuccess = alertContainer();
  alertSuccess.style.backgroundColor = 'green';
  showAlertContainer(message, alertSuccess);
};
const showAlertError = (message) => {
  const alertError = alertContainer();
  alertError.style.backgroundColor = 'red';
  showAlertContainer(message, alertError);
};

export {generateId, getRandomPositiveInteger, getRandomArrayElement, isEscapeKey, isEnterKey, showAlertSuccess, showAlertError};
