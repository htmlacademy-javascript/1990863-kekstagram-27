const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const scalePanel = document.querySelector('.scale');
const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');
const uploadFile = document.querySelector('#upload-file');
const loadedImg = document.querySelector('.img-upload__preview img');

const listEffects = document.querySelector('.effects__list');
const effectsItem = listEffects.querySelectorAll('.effects__item');
const radioEffect = '.effects__radio';
const effectPreview = 'effects__preview--';
const effectStandart = `${effectPreview}none`;

const sliderElement = document.querySelector('.effect-level__slider');
const slidervalue = document.querySelector('.effect-level__value');

const hashtags = document.querySelector('.text__hashtags');
const ourComment = document.querySelector('.text__description');

const decreaseScaleImg = (scale) => {
  const reduceScale = scale - STEP_SCALE;
  if(reduceScale >= MIN_SCALE) {
    return (reduceScale);
  } return scale;
};

const increaseScaleImg = (scale) => {
  const increaseScale = Number(scale) + Number(STEP_SCALE);
  if(increaseScale <= MAX_SCALE) {
    return (increaseScale);
  } return scale;
};

const changeScale = (evt) => {
  if(evt.target === smallerScale || evt.target === biggerScale) {
    let scale = +valueScale.value.replace(/%/, '');

    if(evt.target === smallerScale){
      scale = decreaseScaleImg(scale);
    }else if (evt.target === biggerScale) {
      scale = increaseScaleImg(scale);
    }
    loadedImg.style.transform = `scale(${scale / 100})`;
    valueScale.value = `${scale}%`;
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeFilter = (currentFilter, setValue, valueType) => {
  loadedImg.style.filter = `${currentFilter}(${setValue + valueType})`;
};

const changeSlider = (evt, valueEffect) => {
  let currentFilter = '';
  let valueType;
  if (valueEffect === 'chrome' || valueEffect === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(1);
    if(valueEffect === 'chrome'){
      currentFilter = 'grayscale';
    } else if (valueEffect === 'sepia') {
      currentFilter = 'sepia';
    }
    valueType = '';
  } else if(valueEffect === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
    sliderElement.noUiSlider.set(100);
    currentFilter = 'invert';
    valueType = '%';
  } else if (valueEffect === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(3);
    currentFilter = 'blur';
    valueType = 'px';
  } else if (valueEffect === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(3);
    currentFilter = 'brightness';
    valueType = '';
  } else {
    currentFilter = '';
    valueType = '';
  }

  sliderElement.noUiSlider.on('update', () => {
    const valueSlider = sliderElement.noUiSlider.get();
    slidervalue.value = valueSlider;
    changeFilter(currentFilter, valueSlider, valueType);
  });
};

const setEffect = (evt) => {
  const effectTargetItem = evt.target.closest('.effects__item');
  if(effectTargetItem) {
    effectsItem.forEach((item) => {
      item.querySelector(radioEffect).checked = false;
    });
    effectTargetItem.querySelector(radioEffect).checked = true;
    const effectTarget = effectTargetItem.querySelector(radioEffect).value;
    loadedImg.className = '';
    loadedImg.classList.add(effectPreview + effectTarget);
    if(effectTarget === 'none'){
      sliderElement.classList.add('hidden');
      loadedImg.style.filter = '';
      slidervalue.value = '';
    } else {
      sliderElement.classList.remove('hidden');
      changeSlider(evt, effectTarget);
    }
  }
};

const clearForm = () => {
  loadedImg.src = DEFAULT_IMAGE;
  uploadFile.value = '';
};
const returnStandartImg = () => {
  valueScale.value = `${100}%`;
  loadedImg.style.transform = 'scale(1)';
  loadedImg.className = '';
  loadedImg.classList.add(effectStandart);
  loadedImg.style.filter = '';
  document.querySelector('#effect-none').checked = true;
  slidervalue.value = '';
  hashtags.value = '';
  ourComment.value = '';
  sliderElement.classList.add('hidden');
};

export {returnStandartImg, clearForm, listEffects, setEffect, scalePanel, changeScale};
