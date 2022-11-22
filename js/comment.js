import {generateId, getRandomPositiveInteger, getRandomArrayElement} from './util.js';
import { MESSAGES, NAMES } from './data.js';

const getRandomMessage = (a = 1, b = 2) => {
  const numMessage = getRandomPositiveInteger(a, b);
  const listMessages = [];
  let j = 1;
  while( j <= numMessage) {
    const message = getRandomArrayElement(MESSAGES);
    if(!(listMessages.includes(message))) {
      listMessages.push(message);
      const messageText = listMessages.join(' ');
      if(messageText.length > 140 ){
        listMessages.pop();
      }
      j++;
    }
  }
  return listMessages.join(' ');
};

const idComment = generateId();
const generateComment = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const addComment = (a = 1, b = 10) => {
  const comments = [];
  for(let j = 1; j <= getRandomPositiveInteger(a,b); j++) {
    comments.push(generateComment());
  }

  return comments;
};

export {addComment};
