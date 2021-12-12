type ListenerArg = { [prop: string]: unknown };
type Listener = (obj: ListenerArg) => void;

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

  emit(type: string, obj: ListenerArg): void {
    (this.events[type] ?? []).forEach((listener) => {
      listener(obj);
    });
  }
}

export { EventEmitter };
