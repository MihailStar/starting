type Listener<Data> = (data: Data) => void;

class EventEmitter<Type extends object> {
  private readonly events: { [event: string]: Array<Listener<Type>> };

  constructor() {
    this.events = {};
  }

  one(type: string, listener: Listener<Type>): void {
    const off = this.on(type, (arg) => {
      listener(arg);
      off();
    });
  }

  on(type: string, listener: Listener<Type>): () => void {
    this.events[type] = (this.events[type] ?? []).concat(listener);

    return (): void => this.off(type, listener);
  }

  off(type: string, listener: Listener<Type>): void {
    this.events[type] = (this.events[type] ?? []).filter(
      (func) => func !== listener
    );
  }

  emit(type: string, data: Type): void {
    (this.events[type] ?? []).forEach((listener) => {
      listener(data);
    });
  }
}

export { EventEmitter };
