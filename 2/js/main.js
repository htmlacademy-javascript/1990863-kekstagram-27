// источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  if(min >= 0 && max >= 0) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return NaN;
}
getRandomInt(1, 10);
//Функция для проверки максимальной длины строки
function checkLength(testString, maxLenght) {
  return testString.length <= maxLenght;
}
checkLength('Первая домашка', 20);
checkLength('Раз, два', 5);
