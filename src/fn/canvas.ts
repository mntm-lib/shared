export const createRenderer = (width: number, height: number, transparent = false) => {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', {
    alpha: transparent,
    desynchronized: true
  });

  if (!ctx) {
    throw new Error('Failed');
  }
  if (transparent) {
    ctx.clearRect(0, 0, width, height);
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }

  return ctx;
};
