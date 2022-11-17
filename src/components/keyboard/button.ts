import type { Modifier as SchemeModifier } from './scheme.js';

function createButton(options: {
  char: string;
  modifiers?: SchemeModifier[];
}): HTMLButtonElement {
  const { char, modifiers = [] } = options;
  const classModifiers = modifiers
    .map((modifier) => `keyboard__button_${modifier}`)
    .join(' ');
  const buttonElement = document.createElement('button');

  buttonElement.textContent = char;
  buttonElement.className = `keyboard__button ${classModifiers}`.trim();
  buttonElement.type = 'button';

  return buttonElement;
}

export { createButton };
