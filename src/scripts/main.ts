/* eslint-disable no-console */

import { Counter as MyCounter } from '../components/counter/counter';
import { Keyboard as MyKeyboard } from '../components/keyboard/keyboard';
import { Language } from '../components/keyboard/scheme';
import { Modal as MyModal } from '../components/modal/modal';
import { Rating as MyRating } from '../components/rating/rating';

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
  throw new Error('Container not found');
}

new MyCounter(counterContainer).on('event:change', console.log);
new MyKeyboard(keyboardContainer, {
  language: Language.EN,
}).on('event:change', console.log);
new MyModal(modalContainer).on('event:change', console.log);
new MyRating(ratingContainer).on('event:change', console.log);
