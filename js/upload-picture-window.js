import {isEscapeKey} from './util.js';
import {ModalWindow} from './modal-window.js';
import {returnStandartImg, listEffects, setEffect, scalePanel, changeScale} from'./filter.js';
import {inputHashtag, inputDescription} from './pristine-image-form.js';

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    listEffects.removeEventListener('change', setEffect);
    scalePanel.removeEventListener('click', changeScale);
  }
};

const buttonFile = document.querySelector('.img-upload__control');
const windowDownload = document.querySelector('.img-upload__overlay');
const cancelForm = document.querySelector('#upload-cancel');
const modalLoadWindow = new ModalWindow(windowDownload);

buttonFile.addEventListener('click', () => {
  returnStandartImg();
  modalLoadWindow.openPopup();
  listEffects.addEventListener('change', setEffect);
  scalePanel.addEventListener('click', changeScale);
  document.addEventListener('keydown', onEscKeyDown);
});
cancelForm.addEventListener('click', () => {
  returnStandartImg();
  modalLoadWindow.closePopup();
  listEffects.removeEventListener('change', setEffect);
  scalePanel.removeEventListener('click', changeScale);
  document.removeEventListener('keydown', onEscKeyDown);
});

modalLoadWindow.removeEsc(inputHashtag);
modalLoadWindow.removeEsc(inputDescription);

export {modalLoadWindow};
