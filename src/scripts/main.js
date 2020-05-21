// @flow strict
/* eslint-disable no-console */
import '../blocks/components/icon/icon';
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
  counterContainer === null ||
  keyboardContainer === null ||
  modalContainer === null ||
  ratingContainer === null
) {
  throw new Error('No container');
}

new MyCounter(counterContainer).on('event:change', (o) => console.log(o));
new MyKeyboard(keyboardContainer, {
  language: Language.EN,
}).on('event:change', (o) => console.log(o));
new MyModal(modalContainer).on('event:change', (o) => console.log(o));
new MyRating(ratingContainer).on('event:change', (o) => console.log(o));
