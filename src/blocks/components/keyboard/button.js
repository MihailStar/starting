// @flow strict
/*:: import { type TModifier as TSchemeModifier } from './scheme'; */

const createButton = (
  options /*: $Exact<{
    char: string,
    modifiers?: TSchemeModifier[],
  }> */
) /*: HTMLButtonElement */ => {
  const { char, modifiers = [] } = options;
  const classModifiers = modifiers
    .map((modifier /*: string */) => `keyboard__button_${modifier}`)
    .join(' ');
  const buttonElement = document.createElement('button');

  buttonElement.textContent = char;
  buttonElement.className = `button keyboard__button ${classModifiers}`.trim();
  buttonElement.type = 'button';

  return buttonElement;
};

export default createButton;
