import { niceThrottle } from '../fn/throttle.js';

export const focusScroll = niceThrottle((target: HTMLElement) => {
  if (target.scrollIntoView) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  } else {
    // scrollIntoView polyfill is too big so just focus
    target.focus();
  }
});

export const offsetTop = (el: HTMLElement) => {
  let top = el.offsetTop;
  while (el.offsetParent) {
    el = el.offsetParent as HTMLElement;
    top += el.offsetTop;
  }
  return top;
};


