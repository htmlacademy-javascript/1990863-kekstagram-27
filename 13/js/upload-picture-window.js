import {ModalWindow} from './modal-window.js';
import {standartImg} from'./filter.js';
import {inputHashtag, inputDescription } from './pristine-image-form.js';

const buttonFile = document.querySelector('.img-upload__control');
const windowDownload = document.querySelector('.img-upload__overlay');
const cancelForm = document.querySelector('#upload-cancel');
const modalLoadWindow = new ModalWindow(windowDownload);

buttonFile.addEventListener('click', () => {
  standartImg();
  modalLoadWindow.openPopup();
});
cancelForm.addEventListener('click', () => {
  standartImg();
  modalLoadWindow.closePopup();
});

modalLoadWindow.removeEsc(inputHashtag);
modalLoadWindow.removeEsc(inputDescription);

export {modalLoadWindow};
