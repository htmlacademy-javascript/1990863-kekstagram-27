const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const UNIC_HASHTAG = 1;

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

const validHashtag = (array) => {
  let result;
  array = array.filter( (item) => (
    (item !== '')
  ));
  if(array.length <= MAX_HASHTAGS) {
    const repetition = {};
    array.forEach( (item) => {
      if(item){
        repetition[item.toLowerCase()] = (repetition[item.toLowerCase()] || 0) + 1;
      }
    });
    for (const key in repetition) {
      if (repetition[key] <= UNIC_HASHTAG && regHashtag.test(key) && key.length <= MAX_HASHTAG_LENGTH && key.length >= MIN_HASHTAG_LENGTH) {
        result = array;
      } else{
        result = false;
        break;
      }
    }
  }
  return result;
};

function validateHashtag (value) {
  if(value !== '') {
    const hashtagList = value.split(' ');
    return (validHashtag(hashtagList) && value.length >= MIN_HASHTAG_LENGTH);
  } return true;
}

pristine.addValidator(
  inputHashtag,
  validateHashtag,
  `Хештеги должны начинаться с символа # и от ${MIN_HASHTAG_LENGTH - 1} символа, должны быть уникальны, написаны через пробел и не более 5 хештегов`
);

function onHashtagsChange () {
  pristine.validate(inputHashtag);
}

inputHashtag.addEventListener('input', onHashtagsChange);

function validateDescription (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(
  inputDescription,
  validateDescription,
  `Комментарий не должен содержать более ${MAX_COMMENT_LENGTH} символов`
);

imageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {inputHashtag, inputDescription };
