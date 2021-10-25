/**
 * @example [fallback, singularNominative, singularGenitive, pluralGenitive]
 * @nosideeffects
 */
export const declension = (count: number, titles: string[]) => {
  const rem10 = count % 10;
  const rem100 = count % 100;

  // 1, 21, 31, ...
  if (rem10 === 1 && rem100 !== 11) {
    return titles[1] || titles[0];
  }

  // 2, 3, 4, 22, 23, 24, 32 ...
  if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return titles[2] || titles[3] || titles[0];
  }

  // 5, 6, 7, 8, 9, 10, 11, ...
  return titles[3] || titles[2] || titles[0];
};
