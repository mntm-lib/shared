export const context: typeof globalThis = (() => {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
  return new Function('return this')();
})();
