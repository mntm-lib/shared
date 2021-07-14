import type { AnyFunction } from '../types.js';

export const memoize = <F extends AnyFunction>(fn: F): F => {
  const cache = new Map<string, ReturnType<F>>();
  let next: ReturnType<F>;
  const memoized = function (...args: Parameters<F>) {
    const key = args.join();
    const memo = cache.get(key);
    if (memo) {
      return memo;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    next = fn.apply(this, args);
    cache.set(key, next);
    return next;
  };
  return memoized as F;
};
