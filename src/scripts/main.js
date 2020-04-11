// @flow strict
import '../blocks/components/icon/icon';
import MyCounter from '../blocks/components/counter/counter';
import MyModal from '../blocks/components/modal/modal';
import MyKeyboard from '../blocks/components/keyboard/keyboard';
import { Language } from '../blocks/components/keyboard/scheme';

const counterContainer = document.querySelector('.starting .counter');
const modalContainer = document.querySelector('.starting .modal');
const keyboardContainer = document.querySelector('.starting .keyboard');

if (
  counterContainer === null ||
  modalContainer === null ||
  keyboardContainer === null
) {
  throw new Error('No container');
}

const myCounter = new MyCounter(counterContainer);
const myModal = new MyModal(modalContainer);
const myKeyboard = new MyKeyboard(keyboardContainer, {
  language: Language.RU,
});

window.myCounter = myCounter;
window.myModal = myModal;
window.myKeyboard = myKeyboard;
