// @flow strict
/*::
type TListenerArgs  = { [key: string]: mixed };
type TListener = (args: TListenerArgs) => void;
*/

class MyEventEmitter {
  /*::
  events: {
    [event: string]: Array<TListener>,
  };
  */

  constructor() {
    /** @private */
    this.events = {};
  }

  one(type /*: string */, listener /*: TListener */) /*: void */ {
    const off = this.on(type, (args) => {
      listener(args);
      off();
    });
  }

  on(type /*: string */, listener /*: TListener */) /*: () => void */ {
    this.events[type] = (this.events[type] !== undefined
      ? this.events[type]
      : []
    ).concat(listener);

    return () => this.off(type, listener);
  }

  off(type /*: string */, listener /*: TListener */) /*: void */ {
    if (this.events[type] !== undefined) {
      this.events[type] = this.events[type].filter((func) => func !== listener);
    }
  }

  emit(type /*: string */, args /*: TListenerArgs */) /*: void */ {
    if (this.events[type] !== undefined) {
      this.events[type].forEach((listener) => {
        listener(args);
      });
    }
  }
}

export default MyEventEmitter;
