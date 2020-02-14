import MyEventEmitter from '../../scripts/utilities/my-event-emitter';

class Counter extends MyEventEmitter {
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
    this.properties = {
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
    return this.properties.value;
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set value(value) {
    let normalizeValue = value;

    if (value <= this.properties.min) {
      normalizeValue = this.properties.min;
    } else if (value >= this.properties.max) {
      normalizeValue = this.properties.max;
    }

    if (normalizeValue === this.properties.value) {
      return;
    }

    this.properties.value = normalizeValue;
    this.elements.input.value = String(normalizeValue);
    this.emit('event:change', { value: normalizeValue });
  }

  /**
   * @returns {boolean}
   */
  get isMin() {
    return this.properties.value <= this.properties.min;
  }

  /**
   * @returns {boolean}
   */
  get isMax() {
    return this.properties.value >= this.properties.max;
  }

  /**
   * @returns {void}
   */
  decrease() {
    this.value -= this.properties.step;
  }

  /**
   * @returns {void}
   */
  increase() {
    this.value += this.properties.step;
  }
}

export default Counter;
