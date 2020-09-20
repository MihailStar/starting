type ListenerArgs = { [key: string]: unknown };
type Listener = (args: ListenerArgs) => void;

class EventEmitter {
  private events: {
    [event: string]: Array<Listener>;
  };

  constructor() {
    this.events = {};
  }

  one(type: string, listener: Listener): void {
    const off = this.on(type, (args) => {
      listener(args);
      off();
    });
  }

  on(type: string, listener: Listener): () => void {
    this.events[type] = (this.events[type] !== undefined
      ? this.events[type]
      : []
    ).concat(listener);

    return () => this.off(type, listener);
  }

  off(type: string, listener: Listener): void {
    if (this.events[type] !== undefined) {
      this.events[type] = this.events[type].filter((func) => func !== listener);
    }
  }

  emit(type: string, args: ListenerArgs): void {
    if (this.events[type] !== undefined) {
      this.events[type].forEach((listener) => {
        listener(args);
      });
    }
  }
}

export default EventEmitter;
