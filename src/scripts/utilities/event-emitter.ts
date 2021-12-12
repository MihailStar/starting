type ListenerProps = { [prop: string]: unknown };
type Listener = (obj: ListenerProps) => void;

class EventEmitter {
  private readonly events: { [event: string]: Array<Listener> };

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
    this.events[type] = (this.events[type] ?? []).concat(listener);

    return () => this.off(type, listener);
  }

  off(type: string, listener: Listener): void {
    this.events[type] = (this.events[type] ?? []).filter(
      (func) => func !== listener
    );
  }

  emit(type: string, obj: ListenerProps): void {
    (this.events[type] ?? []).forEach((listener) => {
      listener(obj);
    });
  }
}

export { EventEmitter };
