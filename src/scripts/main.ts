/* eslint-disable no-console */

import { Counter as MyCounter } from '../components/counter/counter.js';
import { Keyboard as MyKeyboard } from '../components/keyboard/keyboard.js';
import { Rating as MyRating } from '../components/rating/rating.js';

const counterContainer = document.querySelector('.starting .counter');
const keyboardContainer = document.querySelector('.starting .keyboard');
const ratingContainer = document.querySelector('.starting .rating');

if (
  !(counterContainer instanceof HTMLElement) ||
  !(keyboardContainer instanceof HTMLElement) ||
  !(ratingContainer instanceof HTMLElement)
) {
  throw new Error('Container not found');
}

new MyCounter(counterContainer).on('event:change', console.log);
new MyKeyboard(keyboardContainer, {
  language: 'en',
}).on('event:change', console.log);
new MyRating(ratingContainer).on('event:change', console.log);
