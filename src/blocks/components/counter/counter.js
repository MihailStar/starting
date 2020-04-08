// @flow strict
/* flowlint unsafe-getters-setters:off */
import MyEventEmitter from '../../../scripts/utilities/event-emitter';

class MyCounter extends MyEventEmitter {
  /*::
  elements: $Exact<{
    decreaseButton: HTMLButtonElement,
    input: HTMLInputElement,
    increaseButton: HTMLButtonElement,
  }>;

  props: $Exact<{
    value: number,
    min: number,
    max: number,
    step: number,
  }>;
  */

  /**
   * @param {HTMLElement} container
   */
  constructor(container /*: HTMLElement */) {
    super();

    const decreaseButton = container.querySelector('.counter__button_decrease');
    const input = container.querySelector('.counter__input');
    const increaseButton = container.querySelector('.counter__button_increase');

    /*::
    if (
      !(decreaseButton instanceof HTMLButtonElement) ||
      !(increaseButton instanceof HTMLButtonElement)
    ) {
      throw new Error('No button');
    }

    if (!(input instanceof HTMLInputElement)) {
      throw new Error('No input');
    }
    */

    /**
     * @private
     * @type {{
        decreaseButton: HTMLButtonElement,
        input: HTMLInputElement,
        increaseButton: HTMLButtonElement,
      }}
     */
    this.elements = {
      decreaseButton,
      input,
      increaseButton,
    };

    /**
     * @private
     * @type {{
        value: number,
        min: number,
        max: number,
        step: number,
      }}
     */
    this.props = {
      value: Number(this.elements.input.value),
      min: Number(this.elements.input.min),
      max: Number(this.elements.input.max),
      step: Number(this.elements.input.step),
    };

    this.elements.decreaseButton.addEventListener('click', () => {
      this.decrease();
      this.elements.decreaseButton.disabled = this.isMin;
      this.elements.increaseButton.disabled = this.isMax;
    });
    this.elements.increaseButton.addEventListener('click', () => {
      this.increase();
      this.elements.decreaseButton.disabled = this.isMin;
      this.elements.increaseButton.disabled = this.isMax;
    });
  }

  /**
   * @returns {number}
   */
  get value() /*: number */ {
    return this.props.value;
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set value(value /*: number */) /*: void */ {
    let normalizeValue = value;

    if (value <= this.props.min) {
      normalizeValue = this.props.min;
    } else if (value >= this.props.max) {
      normalizeValue = this.props.max;
    }

    if (normalizeValue === this.props.value) {
      return;
    }

    this.props.value = normalizeValue;
    this.elements.input.value = String(normalizeValue);
    this.emit('event:change', { value: normalizeValue });
  }

  /**
   * @returns {boolean}
   */
  get isMin() /*: boolean */ {
    return this.props.value <= this.props.min;
  }

  /**
   * @returns {boolean}
   */
  get isMax() /*: boolean */ {
    return this.props.value >= this.props.max;
  }

  /**
   * @returns {void}
   */
  decrease() /*: void */ {
    this.value -= this.props.step;
  }

  /**
   * @returns {void}
   */
  increase() /*: void */ {
    this.value += this.props.step;
  }
}

export default MyCounter;
