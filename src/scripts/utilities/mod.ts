/**
 * Вычисляет арифметический остаток от деления
 * @param n делимое, целое число
 * @param d делитель, целое число, отличное от нуля
 * @returns остаток от деления, целое число
 * @example
 * mod(78, 33); // -> 12
 * mod(-78, 33); // -> 21
 * mod(33, 78); // -> 33
 * mod(-33, 78); // -> 45
 * @tutorial https://ru.wikipedia.org/wiki/Деление_с_остатком
 */
function mod(n: number, d: number): number {
  /** Неполное частное от деления */
  const q = Math.floor(n / d);
  /** Остаток от деления */
  const r = n - d * q;

  return r;
}

export { mod };
