import {API_URL} from './api-data.js';
import {renderSimilarPhotos, initDiscussedFilter, initRandomFilter, initDefaultFilter} from './picture.js';
import {setUserFormSubmit} from './pristine-image-form.js';

import {modalLoadWindow} from './upload-picture-window.js';
import {initUploadPicture} from './upload-image.js';
import {showAlert} from './util.js';
import {showImgFilters} from './global-filters.js';

fetch(`${API_URL}/data`)
  .then((response) => response.json())
  .then((photos) => {
    renderSimilarPhotos(photos);
    showImgFilters();
    initDefaultFilter(photos, () => renderSimilarPhotos(photos));
    initDiscussedFilter(photos, (sortedPhotos) => renderSimilarPhotos(sortedPhotos) );
    initRandomFilter(photos, (sortedPhotos) => renderSimilarPhotos(sortedPhotos) );
  })
  .catch(() => {
    showAlert('Не удалось подключиться к серверу');
  });
initUploadPicture();
setUserFormSubmit( modalLoadWindow.closePopup);

