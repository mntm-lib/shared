import type { AnyFunction } from '../types.js';

import { noop } from './noop.js';

/** @noinline */
export const nextTick = /*#__NOINLINE__*/(() => {
  const flush = Promise.resolve();

  return /*#__NOINLINE__*/(fn: AnyFunction) => {
    flush.then(fn);
    setTimeout(noop, 0);
  };
})();

/** @nosideeffects */
export const nextFrame: AnyFunction = /*#__NOINLINE__*/
  typeof requestAnimationFrame === 'function' ?
    requestAnimationFrame :
    (fn: AnyFunction) => setTimeout(fn, 16);

/** @nosideeffects */
export const cancelFrame = /*#__NOINLINE__*/
  typeof cancelAnimationFrame === 'function' ?
    cancelAnimationFrame :
    clearTimeout;

/** @nosideeffects */
export const nextFrameFlush = /*#__INLINE__*/(fn: AnyFunction) => {
  nextFrame(() => nextTick(fn));
};
