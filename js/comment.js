import {generateId, getRandomPositiveInteger, getRandomArrayElement} from './util.js';
import { MESSAGES, NAMES } from './data.js';

const getRandomMessage = (a = 1, b = 2) => {
  const numMessage = getRandomPositiveInteger(a, b);
  const listMessage = [];
  let j = 1;
  while( j <= numMessage) {
    const message = getRandomArrayElement(MESSAGES);
    if(!(listMessage.includes(message))) {
      listMessage.push(message);
      const messageText = listMessage.join(' ');
      if(messageText.length > 140 ){
        listMessage.pop();
      }
      j++;
    }
  }
  return listMessage.join(' ');
};

const idComment = generateId();
const generateComment = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const addComment = (a = 1, b = 4) => {
  const comments = [];
  for(let j = 1; j <= getRandomPositiveInteger(a,b); j++) {
    comments.push(generateComment());
  }

  return comments;
};

export {addComment};
