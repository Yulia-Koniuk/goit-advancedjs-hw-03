import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import errorIcon from './img/error-icon.svg';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const query = formEl.elements['search-text'].value.trim();

  if (query === '') {
    showError('Please enter a search query!');
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      showError(error.message);
    })
    .finally(() => {
      hideLoader();
    });

  formEl.reset();
}

function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    theme: 'dark',
    maxWidth: 432,
    backgroundColor: '#ef4040',
    messageColor: '#fafafb',
    messageSize: '16',
    messageLineHeight: '24',
    progressBarColor: '#b51b1b',
    iconUrl: errorIcon,
  });
}
