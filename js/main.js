import {API_URL} from './api-data.js';
import {renderSimilarPhotos, initDefaultFilter, initDiscussedFilter, initRandomFilter} from './picture.js';
import {setUserFormSubmit} from './pristine-image-form.js';
import {modalLoadWindow} from './upload-picture-window.js';
import {debounce} from './util.js';


fetch(`${API_URL}/data`)
  .then((response) => response.json())
  .then((photos) => {
    renderSimilarPhotos(photos);
    initDefaultFilter(photos, debounce(() => renderSimilarPhotos(photos)));
    initDiscussedFilter(photos, debounce((sortedPhotos) => renderSimilarPhotos(sortedPhotos) ));
    initRandomFilter(photos, debounce((sortedPhotos) => renderSimilarPhotos(sortedPhotos) ));
  });
setUserFormSubmit( modalLoadWindow.closePopup);
