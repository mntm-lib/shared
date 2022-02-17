import type { AnyFunction } from '../types.js';

import { context } from '../global/context.js';

let tick = true;
const immediate = Promise.resolve();
const flushTick = () => {
  tick = true;
};

export const nextTick = (fn: AnyFunction) => {
  immediate.then(fn);

  if (tick) {
    tick = false;

    immediate.then(flushTick);
    context.setTimeout(flushTick, 0);
  }
};

let frame = 0;
const frames: FrameRequestCallback[] = [];
const flushFrames = (date: number) => {
  frames.forEach((callback) => callback(date));
  frames.length = 0;
};

export const nextFrame = (fn: FrameRequestCallback) => {
  if (frames.push(fn) === 1) {
    frame = context.requestAnimationFrame(flushFrames);
  }

  return frame;
};

export const cancelFrame = (current: number) => {
  if (current === frame) {
    frames.length = 0;
  }

  context.cancelAnimationFrame(current);
};

export const nextFrameFlush = (fn: AnyFunction) => {
  nextFrame(() => nextTick(fn));
};
