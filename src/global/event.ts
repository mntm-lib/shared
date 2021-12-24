import { context } from './context.js';
import { noop } from '../fn/noop.js';

export const passiveOptions = (() => {
  let passive = false;

  const options = Object.defineProperty({}, 'passive', {
    get() {
      passive = true;

      return passive;
    }
  });

  context.addEventListener('passive', noop, options);
  context.removeEventListener('passive', noop, options);

  return passive ? { passive } : false;
})() as AddEventListenerOptions;
