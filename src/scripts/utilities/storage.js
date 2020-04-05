// @flow strict
class MyStorage {
  /*:: getNamespace: () => string; */

  /**
   * @param {string} namespace
   */
  constructor(namespace /*: string */) {
    this.getNamespace = () => {
      return namespace;
    };
  }

  /**
   * @static
   * @returns {boolean}
   */
  static isAvailable() /*: boolean */ {
    const identifier = Date.now().toString();

    try {
      localStorage.setItem(identifier, identifier);
      localStorage.removeItem(identifier);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * @returns {Object<string, *> | null}
   */
  get() /*: { [key: string]: mixed } | null */ {
    try {
      const data = localStorage.getItem(this.getNamespace());

      return typeof data === 'string' ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {Object<string, *>} data
   * @returns {boolean}
   */
  set(data /*: { [key: string]: mixed } */) /*: boolean */ {
    try {
      localStorage.setItem(this.getNamespace(), JSON.stringify(data));

      return true;
    } catch {
      return false;
    }
  }
}

export default MyStorage;
