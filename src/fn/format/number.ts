import { isFunction } from '../is.js';

export const formatNumber = (() => {
  const empty = '';
  const space = '\u00A0';
  const fix = (result: string) => {
    // Bug: 1<breakable>000 -> 1<non-breakable>000
    const clear = result.replace(/\s/g, space);

    // Bug: 1 000 -> 1000
    if (clear.length < 9 && clear[1] === space) {
      return clear.replace(space, empty);
    }

    return clear;
  };

  const localeSupported = () => {
    if (!isFunction(Number.prototype.toLocaleString)) {
      return false;
    }

    const testFrom = 10000.01;

    try {
      return !!testFrom.toLocaleString();
    } catch {
      return false;
    }
  };

  if (localeSupported()) {
    return (n: number) => {
      return fix((+n).toLocaleString());
    };
  }

  return (n: number) => {
    if (!n) {
      return '0';
    }

    const arr = [];
    let an = Math.abs(n);

    if (an > 9999) {
      let part;

      while (an > 999) {
        part = Math.floor(an % 1000);
        if (part < 10) {
          arr.push(`00${part}`);
        } else if (part < 100) {
          arr.push(`0${part}`);
        } else {
          arr.push(`${part}`);
        }
        an = Math.floor(an / 1000);
      }
    }
    arr.push(`${Math.sign(n) * an}`);

    return arr.reverse().join(space);
  };
})();
