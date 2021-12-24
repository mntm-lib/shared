import { useEffect, useLayoutEffect } from 'react';
import { dom } from '../../global/dom.js';

export const useIsomorphicEffect = dom ? useLayoutEffect : useEffect;
