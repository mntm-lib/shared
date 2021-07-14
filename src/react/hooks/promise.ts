import { useState } from 'react';
import { useMountedRef, useHandler, useMount } from './common.js';

type PromiseState<T, E = any> = {
  pending: false;
  data: null;
  error: null;
} | {
  pending: true;
  data: null;
  error: null;
} | {
  pending: false;
  data: T;
  error: null;
} | {
  pending: false;
  data: null;
  error: E;
};

const STATE_DEFAULT = {
  pending: false,
  data: null,
  error: null
} as const;

const STATE_PENDING = {
  pending: true,
  data: null,
  error: null
} as const;

type PromiseHandler<T> = () => Promise<T>;

export const useLazyPromise = <T, E>(handler: PromiseHandler<T>, defaultState: PromiseState<T, E> = STATE_DEFAULT) => {
  const [state, setState] = useState<PromiseState<T, E>>(defaultState);
  const mountedRef = useMountedRef();

  const run = useHandler(() => {
    setState(STATE_PENDING);
    handler().then((data) => {
      return {
        pending: false,
        data,
        error: null
      };
    }).catch((error) => {
      return {
        pending: false,
        data: null,
        error
      };
    }).then((state) => {
      if (mountedRef.current) {
        setState(state as PromiseState<T, E>);
      }
    });
  });

  return [state, run] as const;
};

export const usePromise = <T, E>(handler: PromiseHandler<T>, defaultState: PromiseState<T, E> = STATE_PENDING) => {
  const [state, run] = useLazyPromise<T, E>(handler, defaultState);
  useMount(run);
  return state;
};
