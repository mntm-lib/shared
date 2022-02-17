import type { AnyFunction } from 'src/types.js';

import { nextFrame, nextTick } from './eventloop.js';

export const throttleWith = (throttle: (fn: AnyFunction) => void) => <F extends AnyFunction>(fn: F): F => {
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
    throttle(timer);

    // @ts-expect-error mistype
    // eslint-disable-next-line prefer-rest-params,unicorn/prefer-reflect-apply
    lastReturn = fn.apply(this, arguments);

    return lastReturn;
  };

  return throttled as F;
};

export const niceThrottle = throttleWith(nextFrame);
export const fastThrottle = throttleWith(nextTick);
