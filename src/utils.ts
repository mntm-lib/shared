import type { Predicate } from './types.js';

import { isEmptyArray } from './is.js';

let _weakId = 0;
export const weakUnique = () => Math.random().toString(32).slice(2);
export const weakUniqueId = () => weakUnique() + (++_weakId);

/** @nosideeffects */
export const findIndex = <T>(arr: readonly T[], predicate: Predicate<T>) => {
  return arr.findIndex(predicate);
};

/** @nosideeffects */
export const findLastIndex = <T>(arr: readonly T[], predicate: Predicate<T>) => {
  for (let i = arr.length; i--;) {
    if (predicate(arr[i])) {
      return i;
    }
  }
  return -1;
};

/** @nosideeffects */
export const find = <T>(arr: readonly T[], predicate: Predicate<T>) => {
  return arr.find(predicate);
};

/** @nosideeffects */
export const findLast = <T>(arr: readonly T[], predicate: Predicate<T>) => {
  const index = findLastIndex(arr, predicate);
  return index === -1 ? null : arr[index];
};

/** @nosideeffects */
export const last = <T>(arr: readonly T[]): T | null => {
  return isEmptyArray(arr) ? null : arr[arr.length - 1];
};
