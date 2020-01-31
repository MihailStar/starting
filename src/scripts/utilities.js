/* eslint-disable max-classes-per-file, class-methods-use-this, no-console */
class MyEventEmitter {
  constructor() {
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

class MyStorage {
  /**
   * @param {string} namespace
   */
  constructor(namespace) {
    this.getNamespace = function getNamespace() {
      return namespace;
    };

    if (!this.isAvailable()) {
      const error = 'localStorage is not available';

      this.get = () => console.error(error);
      this.set = () => console.error(error);
    }
  }

  /**
   * @returns {boolean}
   */
  isAvailable() {
    const identifier = String(Date.now());

    try {
      localStorage.setItem(identifier, identifier);
      localStorage.removeItem(identifier);

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * @returns {any}
   */
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.getNamespace()));
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  /**
   * @param {any} data
   * @returns {void}
   */
  set(data) {
    try {
      localStorage.setItem(this.getNamespace(), JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }
}

export { MyEventEmitter, MyStorage };
