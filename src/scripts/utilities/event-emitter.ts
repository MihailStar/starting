type ListenerArgs = Record<string, unknown>;
type Listener = (args: ListenerArgs) => void;

class EventEmitter {
  private readonly events: Record<string, Array<Listener>>;

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

  emit(type: string, args: ListenerArgs): void {
    (this.events[type] ?? []).forEach((listener) => {
      listener(args);
    });
  }
}

export { EventEmitter };
