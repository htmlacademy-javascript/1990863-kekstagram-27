import './download-picture.js';
import {renderSimilarPhotos} from './picture.js';
import {setUserFormSubmit} from './pristine-image-form.js';
import {modalDownloadWindow} from './download-picture.js';

fetch('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderSimilarPhotos(photos);
  });
setUserFormSubmit( modalDownloadWindow.closePopup);
