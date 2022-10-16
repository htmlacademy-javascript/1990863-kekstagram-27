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

const generateId = () => {
  let currentId = 0;
  return function() {
    currentId++;
    return currentId;
  };
};

let idComment = generateId();
const generateComment = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const addComment = (a = 1, b = 4) => {
  const comments = [];
  for(let j = 1; j <= getRandomPositiveInteger(a,b); j++) {
    comments.push(generateComment());
  }

  return comments;
};

let id = generateId();
const createPhotoDescription = () => {
  return {
    id: id(),
    url: `photos/${id}.jpg`,
    description: DESCRIPTION[id - 1],
    likes: getRandomPositiveInteger(15, 200),
    comments: addComment(),
  }
};

const similarPhotoDescription = Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);
console.log(similarPhotoDescription);

