import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catName = document.querySelector('.cat-name');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');

const showLoader = () => (loader.style.display = 'block');
const hideLoader = () => (loader.style.display = 'none');
const showError = () => (error.style.display = 'block');
const hideError = () => (error.style.display = 'none');
const showCatInfo = () => (catInfo.style.display = 'block');
const hideCatInfo = () => (catInfo.style.display = 'none');

const populateBreeds = async () => {
  try {
    showLoader();
    hideError();
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    breedSelect.style.display = 'block';
  } catch (err) {
    showError();
  } finally {
    hideLoader();
  }
};

const displayCatInfo = async breedId => {
  if (!breedId) {
    hideCatInfo();
    return;
  }

  try {
    showLoader();
    hideError();
    hideCatInfo();
    const cat = await fetchCatByBreed(breedId);
    catImage.src = cat.url;
    catName.textContent = cat.breeds[0].name;
    catDescription.textContent = cat.breeds[0].description;
    catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
    showCatInfo();
  } catch (err) {
    showError();
  } finally {
    hideLoader();
  }
};

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  displayCatInfo(breedId);
});

document.addEventListener('DOMContentLoaded', populateBreeds);
