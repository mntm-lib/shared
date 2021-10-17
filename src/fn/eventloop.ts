/** @noinline */
export const nextTick = /*#__NOINLINE__*/(() => {
  const flush = Promise.resolve();
  const noop = () => {
    // Hack to flush event loop asap
  };

  return /*#__NOINLINE__*/(fn: VoidFunction) => {
    flush.then(fn);
    setTimeout(noop, 0);
  };
})();

/** @nosideeffects */
export const nextFrame = /*#__INLINE__*/requestAnimationFrame;

/** @nosideeffects */
export const nextFrameFlush = /*#__INLINE__*/(fn: VoidFunction) => {
  nextFrame(() => nextTick(fn));
};
