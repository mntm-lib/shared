import type { EffectCallback, DependencyList } from 'react';

import { useRef, useMemo, useReducer, useEffect } from 'react';
import { constDeps, constRef } from './react';

type AnyFunction = (...args: any[]) => any;

/** @nosideeffects */
export const useHandler = /*#__INLINE__*/<T extends AnyFunction>(handler: T) => {
  return useRef(handler).current;
};

/** @nosideeffects */
export const useCreation = /*#__INLINE__*/<T>(creator: () => T) => {
  return useMemo(creator, constDeps);
};

/** @noinline */
const updateReducer = /*#__NOINLINE__*/() => ({});
/** @nosideeffects */
export const useUpdate = () => {
  return useReducer(updateReducer, constRef)[1];
};

/** @nosideeffects */
export const useFirstRender = () => {
  const firstRender = useRef(true);
  if (firstRender.current) {
    firstRender.current = false;
    return true;
  }
  return false;
};

/** @nosideeffects */
export const useUpdateEffect = (effect: EffectCallback, deps: DependencyList | undefined) => {
  const isFirstRender = useFirstRender();
  useEffect(() => {
    if (!isFirstRender) {
      return effect();
    }
  }, deps);
};

/** @nosideeffects */
export const useFirstUpdateEffect = /*#__INLINE__*/(effect: EffectCallback) => {
  return useUpdateEffect(effect, constDeps);
};

/** @nosideeffects */
export const useMount = /*#__INLINE__*/(effect: EffectCallback) => {
  return useEffect(effect, constDeps);
};

/** @nosideeffects */
export const useUnmount = /*#__INLINE__*/(effect: ReturnType<EffectCallback>) => {
  return useEffect(() => effect, constDeps);
};
