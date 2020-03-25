class MyEventEmitter {
  constructor() {
    /**
     * @private
     * @type {Object<string, Function>}
     */
    this.events = {};
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  one(type, listener) {
    const off = this.on(type, (args) => {
      listener(args);
      off();
    });
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @returns {Function}
   */
  on(type, listener) {
    this.events[type] = (this.events[type] !== undefined
      ? this.events[type]
      : []
    ).concat(listener);

    return () => this.off(type, listener);
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  off(type, listener) {
    if (this.events[type] !== undefined) {
      this.events[type] = this.events[type].filter((func) => func !== listener);
    }
  }

  /**
   * @param {string} type
   * @param {Object} args
   * @returns {void}
   */
  emit(type, args) {
    if (this.events[type] !== undefined) {
      this.events[type].forEach((listener) => listener(args));
    }
  }
}

export default MyEventEmitter;
