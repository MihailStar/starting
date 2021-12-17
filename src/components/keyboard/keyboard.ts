/* eslint no-param-reassign: ['error', { props: true, ignorePropertyModificationsFor: ['buttonElement'] }] */

import {
  ControlKey as SchemeControlKey,
  Language as SchemeLanguage,
  Modifier as SchemeModifier,
  scheme,
} from './scheme';
import { codes } from './codes';
import { createButton } from './button';
import { EventEmitter as MyEventEmitter } from '../../scripts/utilities/event-emitter';

const CLASS_ACTIVITY = 'keyboard__button_accent';

type ButtonProps = {
  char: string;
  code: string;
  controlKeys: Array<SchemeControlKey>;
  key: string;
  modifiers: Array<SchemeModifier>;
};

class Keyboard extends MyEventEmitter {
  private elements: Array<HTMLButtonElement>;
  private props: {
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

      if (controlKeys.indexOf(SchemeControlKey.SWITCH_ALT) !== -1) {
        this.switchAlt();
        isResetControl = false;
      }

      if (controlKeys.indexOf(SchemeControlKey.SWITCH_CAPS_LOCK) !== -1) {
        this.switchCapsLock();
        isResetControl = false;
      }

      if (controlKeys.indexOf(SchemeControlKey.SWITCH_CONTROL) !== -1) {
        this.switchControl();
        isResetControl = false;
      }

      if (controlKeys.indexOf(SchemeControlKey.SWITCH_LANGUAGE) !== -1) {
        this.switchLanguage();
      }

      if (controlKeys.indexOf(SchemeControlKey.SWITCH_SHIFT) !== -1) {
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

      if (controlKeys.indexOf(SchemeControlKey.CAN_CAPS_LOCK) !== -1) {
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

  getButtonsOnControlKey(key: SchemeControlKey): Array<HTMLButtonElement> {
    return this.elements.filter((buttonElement) => {
      const { controlKeys } = this.getButtonProps(buttonElement);

      if (controlKeys.indexOf(key) !== -1) {
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
    this.getButtonsOnControlKey(SchemeControlKey.SWITCH_ALT).forEach(
      (buttonElement) => {
        if (this.props.isAltPressed) {
          buttonElement.classList.add(CLASS_ACTIVITY);
        } else {
          buttonElement.classList.remove(CLASS_ACTIVITY);
        }
      }
    );
  }

  switchCapsLock(position = !this.props.isCapsLockPressed): void {
    this.props.isCapsLockPressed = position;
    this.rerenderButtonChars();
    this.getButtonsOnControlKey(SchemeControlKey.SWITCH_CAPS_LOCK).forEach(
      (buttonElement) => {
        if (this.props.isCapsLockPressed) {
          buttonElement.classList.add(CLASS_ACTIVITY);
        } else {
          buttonElement.classList.remove(CLASS_ACTIVITY);
        }
      }
    );
  }

  switchControl(position = !this.props.isControlPressed): void {
    this.props.isControlPressed = position;
    this.getButtonsOnControlKey(SchemeControlKey.SWITCH_CONTROL).forEach(
      (buttonElement) => {
        if (this.props.isControlPressed) {
          buttonElement.classList.add(CLASS_ACTIVITY);
        } else {
          buttonElement.classList.remove(CLASS_ACTIVITY);
        }
      }
    );
  }

  switchLanguage(
    language: SchemeLanguage = this.props.currentLanguage === SchemeLanguage.EN
      ? SchemeLanguage.RU
      : SchemeLanguage.EN
  ): void {
    this.props.currentLanguage = language;
    this.rerenderButtonChars();
  }

  switchShift(position = !this.props.isShiftPressed): void {
    this.props.isShiftPressed = position;
    this.rerenderButtonChars();
    this.getButtonsOnControlKey(SchemeControlKey.SWITCH_SHIFT).forEach(
      (buttonElement) => {
        if (this.props.isShiftPressed) {
          buttonElement.classList.add(CLASS_ACTIVITY);
        } else {
          buttonElement.classList.remove(CLASS_ACTIVITY);
        }
      }
    );
  }
}

Object.freeze(Keyboard.prototype);

export { Keyboard };
