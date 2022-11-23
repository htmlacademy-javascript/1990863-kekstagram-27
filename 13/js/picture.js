import {openBigPicture} from './big-picture.js';

import {debounce, getRandomArrayElement} from './util.js';

const RANDOM_PICTURES_AMOUNT = 10;

const similarListPictures = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const defaultFilter = document.querySelector('#filter-default');

const randomFilter = document.querySelector('#filter-random'); //10 случайных, неповторяющихся фотографий.
const discussedFilter = document.querySelector('#filter-discussed'); // отсортированные в порядке убывания количества комментариев

const compareComments = (picA, picB) => {
  const commentsA = picA.comments.length;
  const commentsB = picB.comments.length;

  return commentsB - commentsA;
};
const initDefaultFilter = (pictures, cb) => {
  defaultFilter.addEventListener('click', () => {
    cb(pictures);
  });
};
const initDiscussedFilter = (pictures, cb) => {
  discussedFilter.addEventListener('click', () => {
    const sortedData = pictures.slice().sort(compareComments);
    cb(sortedData);
  });
};

const getRandomPhotosArray = (pictures) => {
  const newArray = [];
  let i = 1;
  while( i <= RANDOM_PICTURES_AMOUNT) {
    const photo = getRandomArrayElement(pictures);
    if(!(newArray.includes(photo))) {
      newArray.push(photo);
      i++;
    }
  }
  return newArray;
};

const initRandomFilter = (pictures, cb) => {
  randomFilter.addEventListener('click', () => {
    cb(getRandomPhotosArray(pictures));
  });
};

const renderSimilarPhotos = debounce((similarPicture) => {

  const similarListFragment = document.createDocumentFragment();
  similarPicture.forEach(({url, description, likes, comments}) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);
  });
  document.querySelectorAll('.picture').forEach((picture) => {picture.remove();});
  similarListPictures.appendChild(similarListFragment);
  openBigPicture(similarListPictures, similarPicture);

  document.querySelectorAll('.picture').forEach((picture) => {picture.remove()});
  similarListPictures.appendChild(similarListFragment);
  openBigPicture(similarListPictures, similarPicture);

});
export {renderSimilarPhotos, initDiscussedFilter, initRandomFilter, initDefaultFilter};
