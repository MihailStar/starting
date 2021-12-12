/** @example classof(null); // -> 'Null' */
function classof(object: unknown): string {
  return Object.prototype.toString.call(object).slice(8, -1);
}

export { classof };
