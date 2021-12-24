import { scrollTop } from '../../fn/scroll.js';
import { niceThrottle } from '../../fn/throttle.js';
import { cancelFrame, nextFrame } from '../../fn/eventloop.js';

import { passiveOptions } from '../../global/event.js';
import { context } from '../../global/context.js';

import { useLayoutMount } from './common.js';

export const useScrollHandler = (handler: (scroll: number) => any) => {
  useLayoutMount(() => {
    let mounted = true;
    let frame: number;

    const fakeScroll = () => {
      if (!mounted) {
        return;
      }

      handler(scrollTop());

      frame = nextFrame(fakeScroll);
    };

    frame = nextFrame(fakeScroll);

    return () => {
      mounted = false;
      cancelFrame(frame);
    };
  });
};

export const useEventScrollHandler = (handler: (scroll: number) => any) => {
  useLayoutMount(() => {
    let mounted = false;

    const scrollHandler = niceThrottle(() => {
      if (mounted) {
        handler(scrollTop());
      }
    });

    context.addEventListener('scroll', scrollHandler, passiveOptions);

    return () => {
      mounted = false;
      context.removeEventListener('scroll', scrollHandler, passiveOptions);
    };
  });
};
