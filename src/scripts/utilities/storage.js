/* eslint-disable no-console */
class MyStorage {
  /**
   * @param {string} namespace
   */
  constructor(namespace) {
    this.getNamespace = function getNamespace() {
      return namespace;
    };

    if (!MyStorage.isAvailable) {
      const error = 'localStorage is not available';

      this.get = () => console.error(error);
      this.set = () => console.error(error);
    }
  }

  /**
   * @static
   * @returns {boolean}
   */
  static get isAvailable() {
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

export default MyStorage;
