import { Modifier as SchemeModifier } from './scheme';

function createButton(options: {
  char: string;
  modifiers?: Array<SchemeModifier>;
}): HTMLButtonElement {
  const { char, modifiers = [] } = options;
  const classModifiers = modifiers
    .map((modifier: SchemeModifier) => `keyboard__button_${modifier}`)
    .join(' ');
  const buttonElement = document.createElement('button');

  buttonElement.textContent = char;
  buttonElement.className = `keyboard__button ${classModifiers}`.trim();
  buttonElement.type = 'button';

  return buttonElement;
}

export default createButton;
