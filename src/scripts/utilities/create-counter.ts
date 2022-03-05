type Counter = {
  get(): number;
  set(value: number): void;
  reset(): void;
  increment(): void;
  decrement(): void;
};

function createCounter(initialValue = 0): Counter {
  let currentCount = initialValue;

  return {
    get(): number {
      return currentCount;
    },
    set(value: number): void {
      currentCount = value;
    },
    reset(): void {
      currentCount = 0;
    },
    increment(): void {
      currentCount += 1;
    },
    decrement(): void {
      currentCount -= 1;
    },
  };
}

export { createCounter };
