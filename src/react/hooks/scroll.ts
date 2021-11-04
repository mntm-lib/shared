import { useLayoutMount } from './common';

export const useScrollHandler = (handler: VoidFunction) => {
  useLayoutMount(() => {
    let mounted = true;
    let frame: number;

    const fakeScroll = () => {
      if (!mounted) {
        return;
      }

      handler();

      frame = window.requestAnimationFrame(fakeScroll);
    };

    frame = window.requestAnimationFrame(fakeScroll);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(frame);
    };
  });
};
