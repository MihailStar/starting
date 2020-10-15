/* eslint-disable no-console */

import MyCounter from '../blocks/components/counter/counter';
import MyKeyboard from '../blocks/components/keyboard/keyboard';
import MyModal from '../blocks/components/modal/modal';
import MyRating from '../blocks/components/rating/rating';
import { Language } from '../blocks/components/keyboard/scheme';

const counterContainer = document.querySelector('.starting .counter');
const keyboardContainer = document.querySelector('.starting .keyboard');
const modalContainer = document.querySelector('.starting .modal');
const ratingContainer = document.querySelector('.starting .rating');

if (
  !(counterContainer instanceof HTMLElement) ||
  !(keyboardContainer instanceof HTMLElement) ||
  !(modalContainer instanceof HTMLElement) ||
  !(ratingContainer instanceof HTMLElement)
) {
  throw new Error('No container');
}

new MyCounter(counterContainer).on('event:change', console.log);
new MyKeyboard(keyboardContainer, {
  language: Language.EN,
}).on('event:change', console.log);
new MyModal(modalContainer).on('event:change', console.log);
new MyRating(ratingContainer).on('event:change', console.log);
