import type { Optional } from '../types.js';

import { isOptional } from './is.js';

const EMPTY = '';

/** @nosideeffects */
export const parseParams = (from: string) => {
  const params: Record<string, string> = {};

  if (from === '') {
    return params;
  }

  let match = null;
  const paramsRegex = /([^&=?]+)(?:=([^&]*))?/g;

  // eslint-disable-next-line no-cond-assign
  while ((match = paramsRegex.exec(from)) !== null) {
    params[match[1]] = match[2] || EMPTY;
  }

  return params;
};

/** @nosideeffects */
export const stringifyParams = (params: Record<string, Optional<string | number>>) => {
  let result = EMPTY;
  let value: Optional<string | number> = EMPTY;

  for (const key in params) {
    if (result !== EMPTY) {
      result += '&';
    }

    value = params[key];
    value = isOptional(value) ? EMPTY : value;

    result += `${key}=${value}`;
  }

  return result;
};

/** @nosideeffects */
export const parseHashParams = (from: string) => {
  const hashQuery = from.indexOf('?');

  if (hashQuery !== -1) {
    return parseParams(from.slice(hashQuery + 1));
  }

  const hashPath = from.indexOf('/');

  if (hashPath !== -1) {
    return {};
  }

  return parseParams(from);
};
