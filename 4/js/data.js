import {generateId, getRandomPositiveInteger, getRandomArrayElement} from './util.js';
import {addComment} from './comment.js';

const DESCRIPTION = [
  'Искусственный водоем',
  'Все на пляж!',
  'Лагуна',
  'Отличный загар',
  'Забаный обед',
  'Bat-мобиль',
  'Клубничка',
  'Морс',
  'Экстремальная  посадка',
  'Порядок',
  'Пляж рядом',
  'Белая Audi',
  'Insta-обед',
  'Сушикотик',
  'Боты',
  'Полет',
  'Хор',
  'Ретрокар',
  'Ночные тапочки',
  'Пальмы',
  'wok',
  'Закат в море',
  'Крабстер',
  'Рок-Концерт',
  'Сафари с бегемотами'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Уиллоу',
  'Джинкс',
  'Денджи',
  'Сларк',
  'Руби',
  'Тарталья',
  'Сева',
  'Мей'
];
const PHOTO_DESCRIPTION_COUNT = 25;

const id = generateId();
const createPhotoDescription = () => {
  const photoId = id();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTION[photoId - 1],
    likes: getRandomPositiveInteger(15, 200),
    comments: addComment(),
}};

const similarPhotoDescription = () => Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);

export {similarPhotoDescription , MESSAGES, NAMES};
