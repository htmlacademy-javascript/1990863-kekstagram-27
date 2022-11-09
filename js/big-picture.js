import {ModalWindow} from './modal-window.js';
const bigPicture = document.querySelector('.big-picture');
const cancelPopup = bigPicture.querySelector('.big-picture__cancel');
const picture = '.picture';
const socialComments = document.querySelector('.social__comments');
const modalBigPicture = new ModalWindow(bigPicture);
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

const openBigPicture = (pictures, fullInfoPictures) => {
  pictures.addEventListener('click', (evt) => {
    //evt.preventDefault();
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
      bigPicture.querySelector('.comments-count').textContent = comments.length;
      const commentCount = bigPicture.querySelector('.social__comment-count');
      commentCount.classList.add('hidden');
      const commentsLoader = bigPicture.querySelector('.comments-loader');
      commentsLoader.classList.add('hidden');
      // Список комментариев под фотографией
      while (socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
      }

      for(let i = 0; i < comments.length; i++){
        const {avatar, message, name} = comments[i];
        createComment(avatar, message, name);
      }
    }
  });

};
cancelPopup.addEventListener('click', () => {
  modalBigPicture.closePopup();
  //closePopup(bigPicture);
});

export {openBigPicture};
