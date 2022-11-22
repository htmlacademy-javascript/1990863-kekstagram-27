const imgFiltersContainer = document.querySelector('.img-filters');
const activeButton = 'img-filters__button--active';
const filterbuttons = document.querySelectorAll('.img-filters__button');


const showImgFilters = () => {
  imgFiltersContainer.classList.remove('img-filters--inactive');
};

imgFiltersContainer.addEventListener('click', (evt) => {
  const buttonTarget = evt.target;
  if(buttonTarget.matches('.img-filters__button')) {
    filterbuttons.forEach((button) => button.classList.remove(activeButton));
    buttonTarget.classList.add(activeButton);
  }
});

export {showImgFilters};
