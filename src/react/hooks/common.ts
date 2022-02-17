import type { DependencyList, EffectCallback } from 'react';
import type { AnyFunction } from '../../types.js';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useIsomorphicEffect } from './isomorphic.js';
import { constDeps, constRef } from '../utils/index.js';

/** @nosideeffects */
export const useHandler = /*#__INLINE__*/<T extends AnyFunction>(handler: T) => {
  return useRef(handler).current;
};

/** @nosideeffects */
export const useCreation = /*#__INLINE__*/<T = undefined>(creator: () => T) => {
  return useMemo(creator, constDeps);
};

/** @noinline */
const updateReducer = /*#__NOINLINE__*/() => ({});

/** @nosideeffects */
export const useUpdateState = () => {
  return useReducer(updateReducer, constRef);
};

/** @nosideeffects */
export const useUpdate = () => {
  return useUpdateState()[1];
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

  useIsomorphicEffect(() => {
    if (!isFirstRender) {
      return effect();
    }
  }, deps);
};

/** @nosideeffects */
export const useFirstUpdateEffect = /*#__INLINE__*/(effect: EffectCallback) => {
  useUpdateEffect(effect, constDeps);
};

/** @nosideeffects */
export const useMount = /*#__INLINE__*/(effect: EffectCallback) => {
  useEffect(effect, constDeps);
};

/** @nosideeffects */
export const useLayoutMount = /*#__INLINE__*/(effect: EffectCallback) => {
  useIsomorphicEffect(effect, constDeps);
};

/** @nosideeffects */
export const useUnmount = /*#__INLINE__*/(effect: ReturnType<EffectCallback>) => {
  useEffect(() => effect, constDeps);
};

/** @nosideeffects */
export const useLayoutUnmount = /*#__INLINE__*/(effect: ReturnType<EffectCallback>) => {
  useIsomorphicEffect(() => effect, constDeps);
};

/** @nosideeffects */
export const useRenderEffect = (effect: EffectCallback) => {
  useLayoutUnmount(useCreation(effect));
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
export const useStableRef = <T = undefined>(value: T) => {
  const stableRef = useRef(value);

  stableRef.current = value;

  return stableRef;
};

/** @nosideeffects */
export const usePrevious = <T = undefined>(value: T) => {
  const previousRef = useRef(value);
  const previous = previousRef.current;

  previousRef.current = value;

  return previous;
};

/** @nosideeffects */
export const usePreviousState = <T = undefined>(value: T | (() => T)) => {
  const [state, setState] = useState(value);

  const preflightRef = useRef<T>(state);
  const previousRef = useRef<T>(state);

  if (preflightRef.current !== state) {
    previousRef.current = preflightRef.current;
    preflightRef.current = state;
  }

  return [previousRef.current, state, setState] as const;
};
