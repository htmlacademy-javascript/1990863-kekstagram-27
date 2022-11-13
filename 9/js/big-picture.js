import {ModalWindow} from './modal-window.js';
const NUMBER_OF_COMMENT = 5;
const bigPicture = document.querySelector('.big-picture');
const cancelPopup = bigPicture.querySelector('.big-picture__cancel');
const picture = '.picture';
const socialComments = document.querySelector('.social__comments');
const modalBigPicture = new ModalWindow(bigPicture);
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const createComment = (src, message, name) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = src;
  img.alt = name;
  img.width = '35';
  img.height = '35';

  const textMessage = document.createElement('p');
  textMessage.classList.add('social__text');
  textMessage.textContent = message;
  comment.append(img);
  comment.append(textMessage);
  socialComments.append(comment);
};
//счетчик комментариев
const countNubmerComment = () => {
  let currentComment = 0;
  return function() {
    currentComment += NUMBER_OF_COMMENT;
    return currentComment;
  };
};

const openBigPicture = (pictures, fullInfoPictures) => {
  pictures.addEventListener('click', (evt) => {

    const pictureTarget = evt.target.closest(picture);
    const arrayPictures = Array.from(pictures.querySelectorAll(picture));

    if(pictureTarget) {
      const index = arrayPictures.indexOf(pictureTarget);
      const {url, description, likes, comments} = fullInfoPictures[index];

      modalBigPicture.openPopup();
      // внутренности катртинки
      const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
      bigPictureImg.src = url;
      bigPictureImg.alt = description;
      bigPicture.querySelector('.likes-count').textContent = likes;
      //если все комментарии показаны
      const ifRestOfComment = () => {
        const commentsCount = document.createElement('span');
        commentsCount.classList.add('comments-count');
        const lenghtComments = document.querySelectorAll('.social__comment').length;

        commentCountBlock.textContent = `${lenghtComments} из `;
        commentCountBlock.append(commentsCount);
        commentsCount.textContent = `${comments.length} комментариев`;
        if(lenghtComments === comments.length) {
          commentsLoader.classList.add('hidden');
        } else {
          commentsLoader.classList.remove('hidden');
        }
      };

      // Список комментариев под фотографией
      while (socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
      }
      for(let i = 0; i < NUMBER_OF_COMMENT; i++){
        if(comments[i]){
          const {avatar, message, name} = comments[i];
          createComment(avatar, message, name);
        }
      }
      ifRestOfComment();
      const nubmerComments = countNubmerComment();
      //показать следующие комменатрии
      const createNextComments = () => {
        const currentNubmerComments = nubmerComments();
        const restOfComment = comments.length - currentNubmerComments;
        const nextNumberComment = currentNubmerComments + NUMBER_OF_COMMENT;

        const getNextComment = (beforeNumber) => {
          for(let i = currentNubmerComments; i < beforeNumber; i++){
            if(comments[i]){
              const {avatar, message, name} = comments[i];
              createComment(avatar, message, name);
            }
          }
        };

        if(restOfComment >= 5 && restOfComment <= comments.length) {
          getNextComment(nextNumberComment);
        }
        else if (restOfComment > 0 && restOfComment < 5) {
          const restIndex = restOfComment + currentNubmerComments;
          getNextComment(restIndex);
        }
        ifRestOfComment();
      };
      commentsLoader.addEventListener('click', createNextComments);

      cancelPopup.addEventListener('click', () => {
        modalBigPicture.closePopup();
        commentsLoader.removeEventListener('click', createNextComments);
      });
      modalBigPicture.onEscDeleteEvent('click', commentsLoader, createNextComments);
    }
  });
};
export {openBigPicture};
