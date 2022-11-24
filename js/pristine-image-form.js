import {showSuccessMessage, showErrorMessage} from './upload-messages.js';
import {returnStandartImg, clearForm} from'./filter.js';
import {API_URL} from './api-data.js';

const MIN_HASHTAG_LENGTH = 2;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;

const imageForm = document.querySelector('#upload-select-image');
const inputHashtag = imageForm.querySelector('.text__hashtags');
const inputDescription = imageForm.querySelector('.text__description');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
}, false);

const regHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (hashtagArray) => {
  const hashtags = hashtagArray.filter(
    (item) => ((item !== ''))
  ).map(
    (item) => (item.toLowerCase())
  );
  const uniqTags = new Set(hashtags);
  const numberHashtags = hashtags.length;
  const isAllTagsUnique = uniqTags.size === numberHashtags;
  const isAllTagsValid = hashtags.every((tag) => regHashtag.test(tag));

  return (numberHashtags <= MAX_HASHTAGS) && isAllTagsUnique && isAllTagsValid;
};

const isHashtagValidate = (value) => {
  if(value !== '') {
    const hashtagList = value.split(' ');
    return (validateHashtag(hashtagList) && value.length >= MIN_HASHTAG_LENGTH);
  } return true;
};

pristine.addValidator(
  inputHashtag,
  isHashtagValidate,
  `Хештеги должны начинаться с символа # и от ${MIN_HASHTAG_LENGTH - 1} символа, должны быть уникальны, написаны через пробел и не более 5 хештегов`
);

const onHashtagsChange = () => {
  pristine.validate(inputHashtag);
};

inputHashtag.addEventListener('input', onHashtagsChange);

const validateDescription = (value) => (
  (value.length <= MAX_COMMENT_LENGTH)
);

pristine.addValidator(
  inputDescription,
  validateDescription,
  `Комментарий не должен содержать более ${MAX_COMMENT_LENGTH} символов`
);
const setUserFormSubmit = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        API_URL,
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
            showSuccessMessage();
            returnStandartImg();
            clearForm();
          } else {
            showErrorMessage();
          }
        })
        .catch(() => {
          showErrorMessage();
        });
    } else {
      showErrorMessage();
    }
  });
};
export {inputHashtag, inputDescription, setUserFormSubmit};
