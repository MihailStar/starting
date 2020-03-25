import MyEventEmitter from '../../../scripts/utilities/event-emitter';

class MyCounter extends MyEventEmitter {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    super();

    /**
     * @private
     * @type {{
        decreaseButton: HTMLButtonElement,
        input: HTMLInputElement,
        increaseButton: HTMLButtonElement
      }}
     */
    this.elements = {
      decreaseButton: element.querySelector('.counter__button_decrease'),
      input: element.querySelector('.counter__input'),
      increaseButton: element.querySelector('.counter__button_increase'),
    };

    /**
     * @private
     * @type {{
        value: number,
        min: number,
        max: number,
        step: number
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
  get value() {
    return this.props.value;
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set value(value) {
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
  get isMin() {
    return this.props.value <= this.props.min;
  }

  /**
   * @returns {boolean}
   */
  get isMax() {
    return this.props.value >= this.props.max;
  }

  /**
   * @returns {void}
   */
  decrease() {
    this.value -= this.props.step;
  }

  /**
   * @returns {void}
   */
  increase() {
    this.value += this.props.step;
  }
}

export default MyCounter;
