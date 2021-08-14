import type { AnyFunction } from 'src/types.js';

import { nextFrame } from './eventloop.js';

export const niceThrottle = <F extends AnyFunction>(fn: F): F => {
  let isThrottling = false;
  let lastReturn: ReturnType<F>;
  const timer = () => {
    isThrottling = false;
  };
  const throttled = function(...args: Parameters<F>) {
    if (isThrottling) {
      return lastReturn;
    }
    isThrottling = true;
    nextFrame(timer);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    lastReturn = fn.apply(this, args);

    return lastReturn;
  };

  return throttled as F;
};
