import { context } from '../global/context.js';
import { niceThrottle } from '../fn/throttle.js';

export const focusScroll = niceThrottle((target: HTMLElement) => {
  if (target.scrollIntoView) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  } else {
    // ScrollIntoView polyfill is too big so just focus
    target.focus();
  }
});

export const offsetTop = (el: HTMLElement) => {
  let current = el;
  let top = current.offsetTop;

  while (current.offsetParent) {
    current = current.offsetParent as HTMLElement;
    top += current.offsetTop;
  }

  return top;
};

export const scrollTop = () => {
  return context.pageYOffset || 0;
};
