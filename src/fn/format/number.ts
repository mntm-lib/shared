import { isDigit } from '../is.js';

/** @noinline */
export const formatNumber = /*#__NOINLINE__*/(() => {
  /* eslint-disable no-param-reassign, no-undefined */

  const empty = '';
  const space = '\u00A0';

  const defaultLocale = undefined;

  /** @noinline */
  const supports = /*#__NOINLINE__*/(() => {
    const number = 0;

    try {
      number.toLocaleString('i');
    } catch (ex: unknown) {
      return (ex as Error).name === 'RangeError';
    }

    return false;
  })();

  const fix = (input: number, result: string) => {
    if (
      input > 999 &&
      input < 9999 &&
      !isDigit(result.charCodeAt(1))
    ) {
      // Bug: 1 000 -> 1000
      result = result.replace(result[1], empty);
    }

    if (
      input > 9999
    ) {
      // Bug: 1<breakable>000 -> 1<non-breakable>000
      result = result.replace(/\s/g, space);
    }

    return result;
  };

  if (supports) {
    return (input: number, locale?: string | undefined) => {
      input = +input;

      return fix(input, input.toLocaleString(locale || defaultLocale));
    };
  }

  return (input: number) => {
    input = +input;

    // Calling toLocaleString is unsafe
    return input.toString();
  };
})();
