/* eslint-disable no-nested-ternary */

/**
 * @example makePlural(3,5, ['яблоко', 'яблока', 'яблок']); // -> 'яблока'
 * @tutorial https://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
 */
function makePlural(number: number, titles: [string, string, string]): string {
  const num = Math.abs(number);
  const rem10 = num % 10;
  const rem100 = num % 100;

  if (Number.isInteger(number)) {
    return titles[
      rem10 === 1 && rem100 !== 11
        ? 0
        : rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 >= 20)
        ? 1
        : 2
    ];
  }

  return titles[1];
}

export default makePlural;
