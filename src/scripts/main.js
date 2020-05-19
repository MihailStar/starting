// @flow strict
/* eslint-disable no-new */
import '../blocks/components/icon/icon';
import MyCounter from '../blocks/components/counter/counter';
import MyKeyboard from '../blocks/components/keyboard/keyboard';
import MyModal from '../blocks/components/modal/modal';
import MyRating from '../blocks/components/rating/rating';
import { Language } from '../blocks/components/keyboard/scheme';

const counterContainer = document.querySelector('.starting .counter');
const keyboardContainer = document.querySelector('.starting .keyboard');
const modalContainer = document.querySelector('.starting .modal');
const ratingContainer = document.querySelector('.starting .keyboard');

if (
  counterContainer === null ||
  keyboardContainer === null ||
  modalContainer === null ||
  ratingContainer === null
) {
  throw new Error('No container');
}

new MyCounter(counterContainer);
new MyKeyboard(keyboardContainer, {
  language: Language.EN,
});
new MyModal(modalContainer);
new MyRating(ratingContainer);
