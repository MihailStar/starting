// @flow
/*::
type TArguments = { [key: string]: * };
type TListener = (args: TArguments) => void;
*/

class MyEventEmitter {
  /*::
  events: {
    [event: string]: TListener[],
  };
  */

  constructor() {
    /**
     * @private
     * @type {Object<string, Array<Function>>}
     */
    this.events = {};
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  one(type /*: string */, listener /*: TListener */) /*: void */ {
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
  on(type /*: string */, listener /*: TListener */) /*: () => void */ {
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
  off(type /*: string */, listener /*: TListener */) /*: void */ {
    if (this.events[type] !== undefined) {
      this.events[type] = this.events[type].filter((func) => func !== listener);
    }
  }

  /**
   * @param {string} type
   * @param {Object<string, *>} args
   * @returns {void}
   */
  emit(type /*: string */, args /*: TArguments */) /*: void */ {
    if (this.events[type] !== undefined) {
      this.events[type].forEach((listener) => listener(args));
    }
  }
}

export default MyEventEmitter;
