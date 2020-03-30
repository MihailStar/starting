// @flow
/*::
type Arguments = { [key: string]: * };
type Listener = (args: Arguments) => void;
*/

class MyEventEmitter {
  /*::
  events: {
    [event: string]: Listener[],
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
  one(type /*: string */, listener /*: Listener */) /*: void */ {
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
  on(type /*: string */, listener /*: Listener */) /*: () => void */ {
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
  off(type /*: string */, listener /*: Listener */) /*: void */ {
    if (this.events[type] !== undefined) {
      this.events[type] = this.events[type].filter((func) => func !== listener);
    }
  }

  /**
   * @param {string} type
   * @param {Object<string, *>} args
   * @returns {void}
   */
  emit(type /*: string */, args /*: Arguments */) /*: void */ {
    if (this.events[type] !== undefined) {
      this.events[type].forEach((listener) => listener(args));
    }
  }
}

export default MyEventEmitter;
