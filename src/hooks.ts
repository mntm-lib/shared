import type { EffectCallback, DependencyList } from 'react';

import { useRef, useMemo, useReducer, useEffect } from 'react';
import { constDeps, constRef } from './react';

type AnyFunction = (...args: any[]) => any;
export const useHandler = <T extends AnyFunction>(handler: T) => {
  return useRef(handler).current;
};

export const useCreation = <T>(creator: () => T) => {
  return useMemo(creator, constDeps);
};

const updateReducer = () => ({});
export const useUpdate = () => {
  return useReducer(updateReducer, constRef)[1];
};

export const useFirstRender = () => {
  const firstRender = useRef(true);
  if (firstRender.current) {
    firstRender.current = false;
    return true;
  }
  return false;
};

export const useUpdateEffect = (effect: EffectCallback, deps: DependencyList | undefined) => {
  const isFirstRender = useFirstRender();
  useEffect(() => {
    if (!isFirstRender) {
      return effect();
    }
  }, deps);
};

export const useFirstUpdateEffect = (effect: EffectCallback) => {
  return useUpdateEffect(effect, constDeps);
};
