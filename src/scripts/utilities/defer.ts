/* eslint-disable @typescript-eslint/no-explicit-any */

function defer(func: (...args: any[]) => any): void {
  setTimeout(func, 0);
}

export { defer };
