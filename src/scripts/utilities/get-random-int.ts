/**
 * @param min целое число
 * @param max целое число
 * @returns целое число в диапазоне [min, max]
 * @example getRandomInt(0, array.length - 1);
 */
function getRandomInt(min: number, max: number): number {
  const randomInt = Math.floor(min + Math.random() * (max + 1 - min));

  return randomInt;
}

export { getRandomInt };
