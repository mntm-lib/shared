import type { EffectCallback, DependencyList } from 'react';
import type { AnyFunction } from '../../types.js';

import { useRef, useMemo, useReducer, useEffect, useLayoutEffect } from 'react';
import { constDeps, constRef } from '../utils/index.js';

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
export const useUpdateLayoutEffect = (effect: EffectCallback, deps: DependencyList | undefined) => {
  const isFirstRender = useFirstRender();
  useLayoutEffect(() => {
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

/** @nosideeffects */
export const useMountedRef = () => {
  const mountedRef = useRef(true);
  useUnmount(() => {
    mountedRef.current = false;
  });
  return mountedRef;
};

/** @nosideeffects */
export const useStableRef = <T>(value: T) => {
  const stableRef = useRef(value);
  stableRef.current = value;
  return stableRef;
};

/** @nosideeffects */
export const usePrevious = <T>(value: T) => {
  const previousRef = useRef(value);
  const previous = previousRef.current;
  previousRef.current = value;
  return previous;
};
