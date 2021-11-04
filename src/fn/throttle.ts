import type { AnyFunction } from 'src/types.js';

import { nextFrame } from './eventloop.js';

export const niceThrottle = <F extends AnyFunction>(fn: F): F => {
  let isThrottling = false;
  let lastReturn: ReturnType<F>;
  const timer = () => {
    isThrottling = false;
  };
  const throttled = function() {
    if (isThrottling) {
      return lastReturn;
    }
    isThrottling = true;
    nextFrame(timer);

    // @ts-expect-error mistype
    // eslint-disable-next-line prefer-rest-params,unicorn/prefer-reflect-apply
    lastReturn = fn.apply(this, arguments);

    return lastReturn;
  };

  return throttled as F;
};
