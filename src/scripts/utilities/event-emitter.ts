type Listener<Data> = (data: Data) => void;

class EventEmitter<Type extends object> {
  private readonly events: { [event: string]: Listener<Type>[] };

  public constructor() {
    this.events = {};
  }

  public one(type: string, listener: Listener<Type>): void {
    const off = this.on(type, (arg) => {
      listener(arg);
      off();
    });
  }

  public on(type: string, listener: Listener<Type>): () => void {
    this.events[type] = (this.events[type] ?? []).concat(listener);

    return (): void => this.off(type, listener);
  }

  public off(type: string, listener: Listener<Type>): void {
    this.events[type] = (this.events[type] ?? []).filter(
      (func) => func !== listener
    );
  }

  public emit(type: string, data: Type): void {
    (this.events[type] ?? []).forEach((listener) => {
      listener(data);
    });
  }
}

export { EventEmitter };
