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
function getRandomPositiveInteger(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.round(Math.random() * (upper - lower) + lower);
  return Math.floor(result);
}
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

let i = 0;
const idCount = () => { return ++i};
let idComment = 0;
const getIdComent = () => {return ++idComment;};
const getRandomMessage = (a = 1, b = 2) => {
  let numMessage = getRandomPositiveInteger(a, b);
  let listMessage = [];
  let j = 1;
  while( j <= numMessage) {
    const message = getRandomArrayElement(MESSAGES);
    if(!(listMessage.find(item => item === message))) {
      listMessage.push(message);
      j++;
    }
  }
  return listMessage.join(' ');
};
const comment = () => ({
  id: getIdComent(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const generateComment = (a = 1, b = 4) => {
  const comments = [];
  for(let j = 1; j <= getRandomPositiveInteger(a,b); j++) {
    comments.push(comment());
  }
  return comments;
};
let randomNums = [];
const generateId = (a = 1, b = PHOTO_DESCRIPTION_COUNT) => {
  let id = getRandomPositiveInteger(a,b);
  if(!(randomNums.find(item => item === id))) {
    randomNums.push(id);
    return(id);
  } return generateId();
};

const createPhotoDescription = () => {
  let idPhoto = generateId();
  return {
    id: idPhoto,
    url: `photos/${idPhoto}.jpg`,
    description: DESCRIPTION[idPhoto - 1],
    likes: getRandomPositiveInteger(15, 200),
    comments: generateComment(),
  }
};
const similarPhotoDescription = Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);
console.log(similarPhotoDescription);

