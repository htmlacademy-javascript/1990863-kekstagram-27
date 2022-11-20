
import {openBigPicture} from './big-picture.js';

const similarListPictures = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderSimilarPhotos = (similarPicture) => {
  const similarListFragment = document.createDocumentFragment();
  similarPicture.forEach(({url, description, likes, comments}) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);
  });

  similarListPictures.appendChild(similarListFragment);
  openBigPicture(similarListPictures, similarPicture);
};
export {renderSimilarPhotos};
