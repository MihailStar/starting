/**
 * @returns [min, max]
 */
function getRandomInt(min: number, max: number): number {
  const randomInt = Math.floor(min + Math.random() * (max + 1 - min));

  return randomInt;
}

export { getRandomInt };
