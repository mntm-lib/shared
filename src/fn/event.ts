export const stopEvent = (e: Partial<Event>) => {
  if (e.stopImmediatePropagation) {
    e.stopImmediatePropagation();
  }

  if (e.stopPropagation) {
    e.stopPropagation();
  }
};

export const cancelEvent = (e: Partial<Event>) => {
  stopEvent(e);

  if (e.cancelable) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  return false;
};
