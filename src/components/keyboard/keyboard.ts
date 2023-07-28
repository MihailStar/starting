/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint no-param-reassign: ['error', { props: true, ignorePropertyModificationsFor: ['buttonElement'] }] */

import { EventEmitter as MyEventEmitter } from '../../scripts/utilities/event-emitter.js';
import { createButton } from './button.js';
import { codes } from './codes.js';
import type {
  ControlKey as SchemeControlKey,
  Language as SchemeLanguage,
  Modifier as SchemeModifier,
} from './scheme.js';
import { scheme } from './scheme.js';

const ACTIVE_BUTTON_CLASS = 'keyboard__button_accent';

type ButtonProps = {
  char: string;
  code: string;
  controlKeys: SchemeControlKey[];
  key: string;
  modifiers: SchemeModifier[];
};

class Keyboard extends MyEventEmitter<{
  char: string;
  code: string;
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
}> {
  private readonly elements: HTMLButtonElement[];
  private readonly props: {
    currentLanguage: SchemeLanguage;
    isAltPressed: boolean;
    isCapsLockPressed: boolean;
    isControlPressed: boolean;
    isShiftPressed: boolean;
    schemeIndexes: WeakMap<HTMLButtonElement, [number, number]>;
  };

  constructor(
    container: HTMLElement,
    options: {
      language: SchemeLanguage;
    }
  ) {
    super();

    const { language } = options;

    this.elements = [];
    this.props = {
      currentLanguage: language,
      isAltPressed: false,
      isCapsLockPressed: false,
      isControlPressed: false,
      isShiftPressed: false,
      schemeIndexes: new WeakMap(),
    };

    const initialize = (): void => {
      const fragmentElement = document.createDocumentFragment();

      scheme[this.props.currentLanguage].forEach((rowScheme, rowIndex) => {
        const rowElement = document.createElement('div');

        rowElement.className = 'keyboard__row';
        rowScheme.forEach((buttonScheme, buttonIndex) => {
          const {
            chars: [char],
            modifiers = [],
          } = buttonScheme;
          const buttonElement = createButton({ char, modifiers });

          rowElement.appendChild(buttonElement);
          this.elements.push(buttonElement);
          this.props.schemeIndexes.set(buttonElement, [rowIndex, buttonIndex]);
        });

        fragmentElement.appendChild(rowElement);
      });

      container.appendChild(fragmentElement);
    };

    const onButtonClick = (buttonElement: HTMLButtonElement): void => {
      const { controlKeys } = this.getButtonProps(buttonElement);
      let isResetControl = true;

      if (controlKeys.includes('switchAlt')) {
        this.switchAlt();
        isResetControl = false;
      }

      if (controlKeys.includes('switchCapsLock')) {
        this.switchCapsLock();
        isResetControl = false;
      }

      if (controlKeys.includes('switchControl')) {
        this.switchControl();
        isResetControl = false;
      }

      if (controlKeys.includes('switchLanguage')) {
        this.switchLanguage();
      }

      if (controlKeys.includes('switchShift')) {
        this.switchShift();
        isResetControl = false;
      }

      const { char, code, key } = this.getButtonProps(buttonElement);

      this.emit('event:change', {
        char,
        code,
        key,
        altKey: this.props.isAltPressed,
        ctrlKey: this.props.isControlPressed,
        shiftKey: this.props.isShiftPressed,
      });

      if (isResetControl) {
        this.switchAlt(false);
        this.switchControl(false);
        this.switchShift(false);
      }
    };

    const bind = (): void => {
      container.addEventListener(
        'click',
        ({ target }) => {
          if (target instanceof HTMLButtonElement) {
            onButtonClick(target);
          }
        },
        true
      );
    };

    initialize();
    bind();
  }

  forEachButton(
    callback: (
      buttonElement: HTMLButtonElement,
      buttonProps: ButtonProps
    ) => void
  ): void {
    this.elements.forEach((buttonElement) => {
      const buttonProps = this.getButtonProps(buttonElement);

      callback(buttonElement, buttonProps);
    });
  }

  getButtonProps(buttonElement: HTMLButtonElement): ButtonProps {
    const schemeIndex = this.props.schemeIndexes.get(buttonElement);

    if (schemeIndex === undefined) {
      throw new Error('No schemeIndex');
    }

    const [rowIndex, buttonIndex] = schemeIndex;
    const code = codes[rowIndex][buttonIndex];
    const {
      chars,
      keys,
      controlKeys = [],
      modifiers = [],
    } = scheme[this.props.currentLanguage][rowIndex][buttonIndex];

    const getCurrentIndex = (): number => {
      if (chars.length === 1) {
        return 0;
      }

      if (controlKeys.includes('canCapsLock')) {
        return (this.props.isCapsLockPressed && this.props.isShiftPressed) ||
          (!this.props.isCapsLockPressed && !this.props.isShiftPressed)
          ? 0
          : 1;
      }

      return this.props.isShiftPressed ? 1 : 0;
    };

    return {
      char: chars[getCurrentIndex()],
      code,
      controlKeys,
      key: keys[getCurrentIndex()],
      modifiers,
    };
  }

  getButtonsOnControlKey(key: SchemeControlKey): HTMLButtonElement[] {
    return this.elements.filter((buttonElement) => {
      const { controlKeys } = this.getButtonProps(buttonElement);

      if (controlKeys.includes(key)) {
        return true;
      }

      return false;
    });
  }

  rerenderButtonChars(): void {
    this.forEachButton((buttonElement, buttonProps) => {
      const { char } = buttonProps;

      buttonElement.textContent = char;
    });
  }

  switchAlt(position = !this.props.isAltPressed): void {
    this.props.isAltPressed = position;
    this.getButtonsOnControlKey('switchAlt').forEach((buttonElement) => {
      if (this.props.isAltPressed) {
        buttonElement.classList.add(ACTIVE_BUTTON_CLASS);
      } else {
        buttonElement.classList.remove(ACTIVE_BUTTON_CLASS);
      }
    });
  }

  switchCapsLock(position = !this.props.isCapsLockPressed): void {
    this.props.isCapsLockPressed = position;
    this.rerenderButtonChars();
    this.getButtonsOnControlKey('switchCapsLock').forEach((buttonElement) => {
      if (this.props.isCapsLockPressed) {
        buttonElement.classList.add(ACTIVE_BUTTON_CLASS);
      } else {
        buttonElement.classList.remove(ACTIVE_BUTTON_CLASS);
      }
    });
  }

  switchControl(position = !this.props.isControlPressed): void {
    this.props.isControlPressed = position;
    this.getButtonsOnControlKey('switchControl').forEach((buttonElement) => {
      if (this.props.isControlPressed) {
        buttonElement.classList.add(ACTIVE_BUTTON_CLASS);
      } else {
        buttonElement.classList.remove(ACTIVE_BUTTON_CLASS);
      }
    });
  }

  switchLanguage(
    language: SchemeLanguage = this.props.currentLanguage === 'en' ? 'ru' : 'en'
  ): void {
    this.props.currentLanguage = language;
    this.rerenderButtonChars();
  }

  switchShift(position = !this.props.isShiftPressed): void {
    this.props.isShiftPressed = position;
    this.rerenderButtonChars();
    this.getButtonsOnControlKey('switchShift').forEach((buttonElement) => {
      if (this.props.isShiftPressed) {
        buttonElement.classList.add(ACTIVE_BUTTON_CLASS);
      } else {
        buttonElement.classList.remove(ACTIVE_BUTTON_CLASS);
      }
    });
  }
}

Object.freeze(Keyboard.prototype);

export { Keyboard };
