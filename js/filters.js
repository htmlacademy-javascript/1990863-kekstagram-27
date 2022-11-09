//изменение масштаба изображения;
//применение одного из заранее заготовленных эффектов;
//выбор глубины эффекта с помощью ползунка;

const step = 25;
const min = 25;
const max = 100;
const scalePanel = document.querySelector('.scale');
const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');
const downloadedImg = document.querySelector('.img-upload__preview img');

const changeScale = (evt) => {
  if(evt.target === smallerScale || evt.target === biggerScale) {
    let scale = +valueScale.value.replace(/%/, '');

    if(evt.target === smallerScale){
      scale = smallerScaleImg(scale);
    }else if (evt.target === biggerScale) {
      scale = biggerScaleImg(scale);
    }
    downloadedImg.style.transform = `scale(${scale / 100})`;
    valueScale.value = `${scale}%`;

  }
};

function smallerScaleImg(scale) {
  if(+scale - step >= min) {
    return (scale -= step);
  } return scale;
}

function biggerScaleImg(scale) {
  if(+scale + +step <= max) {
    return (scale += +step);
  } return scale;
}

scalePanel.addEventListener('click', changeScale);

const listEffects = document.querySelector('.effects__list');
const effectsItem = listEffects.querySelectorAll('.effects__item');
const radioEffect = '.effects__radio';
const effectPreview = 'effects__preview--';
const effectStandart = `${effectPreview}none`;
//const sliderEffect = {  none: 'filter удаляются.',  chrome: 'grayscale(0..1) с шагом 0.1;',  sepia: 'sepia(0..1) с шагом 0.1;',  marvin: 'invert(0..100%) с шагом 1%;',  phobos: 'blur(0..3px) с шагом 0.1px;',  heat: 'brightness(1..3) с шагом 0.1;',};
const setEffect = (evt) => {
  const effectTargetItem = evt.target.closest('.effects__item');
  if(effectTargetItem) {
    effectsItem.forEach((item) => {
      item.querySelector(radioEffect).checked = false;
    });
    effectTargetItem.querySelector(radioEffect).checked = true;
    const effectTarget = effectTargetItem.querySelector(radioEffect).value;
    downloadedImg.className = '';
    downloadedImg.classList.add(effectPreview + effectTarget);


  }
};

listEffects.addEventListener('click', setEffect);

const hashtags = document.querySelector('.text__hashtags');
const ourComment = document.querySelector('.text__description');

const standartImg = () =>{
  valueScale.value = `${100}%`;
  downloadedImg.style.transform = 'scale(1)';
  downloadedImg.className = '';
  downloadedImg.classList.add(effectStandart);
  document.querySelector('#effect-none').checked = true;
  hashtags.value = '';
  ourComment.value = '';
};
export {standartImg};
