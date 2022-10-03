// источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  if(min >= 0 && max >= 0) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return 'NaN';
}
console.log(getRandomInt(1, 10));



//Функция для проверки максимальной длины строки
function checkLenght(testString, maxLenght) {
  if(testString.length <= maxLenght) {
    return true;
  }
  return false;
}
console.log(checkLenght('Первая домашка', 20));
console.log(checkLenght('Раз, два', 5));
