import {API_URL} from './api-data.js';
import {renderSimilarPhotos, applyDiscussedFilter, applyRandomFilter, applyDefaultFilter} from './picture.js';
import {setUserFormSubmit} from './pristine-image-form.js';
import {modalLoadWindow} from './upload-picture-window.js';
import {uploadPicture} from './upload-image.js';
import {showAlert} from './util.js';
import {showImgFilters} from './global-filters.js';

fetch(`${API_URL}/data`)
  .then((response) => response.json())
  .then((photos) => {
    renderSimilarPhotos(photos);

    showImgFilters();
    applyDefaultFilter(photos, () => renderSimilarPhotos(photos));
    applyDiscussedFilter(photos, (sortedPhotos) => renderSimilarPhotos(sortedPhotos) );
    applyRandomFilter(photos, (sortedPhotos) => renderSimilarPhotos(sortedPhotos) );
  })
  .catch(() => {
    showAlert('Не удалось подключиться к серверу');
  });
uploadPicture();
setUserFormSubmit( modalLoadWindow.closePopup);
