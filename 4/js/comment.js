import {generateId, getRandomPositiveInteger, getRandomArrayElement} from './util.js';
import { MESSAGES, NAMES } from './data.js';

const getRandomMessage = (a = 1, b = 2) => {
  const numMessage = getRandomPositiveInteger(a, b);
  const listMessage = [];
  let j = 1;
  while( j <= numMessage) {
    const message = getRandomArrayElement(MESSAGES);
    if(!(listMessage.find(item => item === message))) {
      listMessage.push(message);
      j++;
    }
  }
  return listMessage.join(' ');
};

const idComment = generateId();
const generateComment = () => {
  return {
    id: idComment(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomArrayElement(NAMES),
}};

const addComment = (a = 1, b = 4) => {
  const comments = [];
  for(let j = 1; j <= getRandomPositiveInteger(a,b); j++) {
    comments.push(generateComment());
  }

  return comments;
};

export {addComment};
