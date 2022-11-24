import {isEscapeKey} from './util.js';
function ModalWindow(popupWindow) {

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      this.closePopup();
    }
    return evt;
  };

  this.openPopup = () => {
    popupWindow.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscKeydown);
  };
  this.closePopup = () => {
    popupWindow.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  this.removeEsc = (onFocusInput) => {
    onFocusInput.onfocus = () => {
      document.removeEventListener('keydown', onPopupEscKeydown);
    };
    onFocusInput.onblur = () => {
      document.addEventListener('keydown', onPopupEscKeydown);
    };
  };

  this.onEscDeleteEvent = (callback, fromWindow, thisFunction) => {
    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        fromWindow.removeEventListener(callback, thisFunction);
      }
    });
  };
}


export {ModalWindow};
