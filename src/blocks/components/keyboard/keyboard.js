// @flow strict
/* eslint no-param-reassign: ["error", { "props": false }] */
import codes from './codes';
import createButton from './button';
import MyEventEmitter from '../../../scripts/utilities/event-emitter';
import scheme, {
  ControlKey,
  Language,
  /*::
  type TControlKey as TSchemeControlKey,
  type TLanguage as TSchemeLanguage,
  type TModifier as TSchemeModifier,
  */
} from './scheme';

const CLASS_ACTIVITY = 'keyboard__button_accent';

/*::
type TButtonProps = $Exact<{
  char: string,
  code: string,
  controlKeys: TSchemeControlKey[],
  key: string,
  modifiers: TSchemeModifier[],
}>;
*/

class MyKeyboard extends MyEventEmitter {
  /*::
  elements: HTMLButtonElement[];
  props: $Exact<{
    currentLanguage: TSchemeLanguage,
    isAltPressed: boolean,
    isCapsLockPressed: boolean,
    isControlPressed: boolean,
    isShiftPressed: boolean,
    schemeIndexes: WeakMap<HTMLButtonElement, [number, number]>,
  }>;
  */

  constructor(
    container /*: HTMLElement */,
    options /*: $Exact<{
      language: TSchemeLanguage,
    }> */
  ) {
    super();

    const { language } = options;

    Object.defineProperties(this, {
      /** @private */
      elements: {
        value: [],
      },
      /** @private */
      props: {
        value: {
          currentLanguage: language,
          isAltPressed: false,
          isCapsLockPressed: false,
          isControlPressed: false,
          isShiftPressed: false,
          schemeIndexes: new WeakMap(),
        },
      },
    });

    const initialize = () /*: void */ => {
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

    const onButtonClick = (
      buttonElement /*: HTMLButtonElement */
    ) /*: void */ => {
      const { controlKeys } = this.getButtonProps(buttonElement);
      let isResetControl = true;

      if (controlKeys.indexOf(ControlKey.SWITCH_ALT) !== -1) {
        this.switchAlt();
        isResetControl = false;
      }

      if (controlKeys.indexOf(ControlKey.SWITCH_CAPS_LOCK) !== -1) {
        this.switchCapsLock();
        isResetControl = false;
      }

      if (controlKeys.indexOf(ControlKey.SWITCH_CONTROL) !== -1) {
        this.switchControl();
        isResetControl = false;
      }

      if (controlKeys.indexOf(ControlKey.SWITCH_LANGUAGE) !== -1) {
        this.switchLanguage();
      }

      if (controlKeys.indexOf(ControlKey.SWITCH_SHIFT) !== -1) {
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

    const bind = () /*: void */ => {
      container.addEventListener(
        'click',
        (event /*: Event */) => {
          const { target } = event;

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
    callback /*: (
      buttonElement: HTMLButtonElement,
      buttonProps: TButtonProps
    ) => void */
  ) /*: void */ {
    this.elements.forEach((buttonElement) => {
      const buttonProps = this.getButtonProps(buttonElement);

      callback(buttonElement, buttonProps);
    });
  }

  getButtonProps(buttonElement /*: HTMLButtonElement */) /*: TButtonProps */ {
    const schemeIndex = this.props.schemeIndexes.get(buttonElement);

    /*::
    if (schemeIndex === undefined) {
      throw new Error('No schemeIndex');
    }
    */

    const [rowIndex, buttonIndex] = schemeIndex;
    const code = codes[rowIndex][buttonIndex];
    const { chars, keys, controlKeys = [], modifiers = [] } = scheme[
      this.props.currentLanguage
    ][rowIndex][buttonIndex];

    const getCurrentIndex = () /*: number */ => {
      if (chars.length === 1) {
        return 0;
      }

      if (controlKeys.indexOf(ControlKey.CAN_CAPS_LOCK) !== -1) {
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

  getButtonsOnControlKey(
    key /*: TSchemeControlKey */
  ) /*: HTMLButtonElement[] */ {
    return this.elements.filter((buttonElement) => {
      const { controlKeys } = this.getButtonProps(buttonElement);

      if (controlKeys.indexOf(key) !== -1) {
        return true;
      }

      return false;
    });
  }

  rerenderButtonChars() /*: void */ {
    this.forEachButton((buttonElement, buttonProps) => {
      const { char } = buttonProps;

      buttonElement.textContent = char;
    });
  }

  switchAlt(
    position /*:: ?: boolean */ = !this.props.isAltPressed
  ) /*: void */ {
    this.props.isAltPressed = position;
    this.getButtonsOnControlKey(ControlKey.SWITCH_ALT).forEach(
      (buttonElement) => {
        if (this.props.isAltPressed) {
          buttonElement.classList.add(CLASS_ACTIVITY);
        } else {
          buttonElement.classList.remove(CLASS_ACTIVITY);
        }
      }
    );
  }

  switchCapsLock(
    position /*:: ?: boolean */ = !this.props.isCapsLockPressed
  ) /*: void */ {
    this.props.isCapsLockPressed = position;
    this.rerenderButtonChars();
    this.getButtonsOnControlKey(ControlKey.SWITCH_CAPS_LOCK).forEach(
      (buttonElement) => {
        if (this.props.isCapsLockPressed) {
          buttonElement.classList.add(CLASS_ACTIVITY);
        } else {
          buttonElement.classList.remove(CLASS_ACTIVITY);
        }
      }
    );
  }

  switchControl(
    position /*:: ?: boolean */ = !this.props.isControlPressed
  ) /*: void */ {
    this.props.isControlPressed = position;
    this.getButtonsOnControlKey(ControlKey.SWITCH_CONTROL).forEach(
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
    language /*:: ?: TSchemeLanguage */ = this.props.currentLanguage ===
    Language.EN
      ? Language.RU
      : Language.EN
  ) /*: void */ {
    this.props.currentLanguage = language;
    this.rerenderButtonChars();
  }

  switchShift(
    position /*:: ?: boolean */ = !this.props.isShiftPressed
  ) /*: void */ {
    this.props.isShiftPressed = position;
    this.rerenderButtonChars();
    this.getButtonsOnControlKey(ControlKey.SWITCH_SHIFT).forEach(
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

Object.freeze(MyKeyboard.prototype);

export default MyKeyboard;
