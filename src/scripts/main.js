// @flow strict
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

const myCounter = new MyCounter(counterContainer);
const myKeyboard = new MyKeyboard(keyboardContainer, {
  language: Language.EN,
});
const myModal = new MyModal(modalContainer);
const myRating = new MyRating(ratingContainer);

window.myCounter = myCounter;
window.myKeyboard = myKeyboard;
window.myModal = myModal;
window.myRating = myRating;
