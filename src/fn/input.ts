export const emitChange = (el: HTMLInputElement) => {
  const event = new Event('change', { bubbles: true });

  Object.defineProperty(event, 'simulated', {
    value: true
  });
  el.dispatchEvent(event);
};

const emitterValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

export const emitValue = (el: HTMLInputElement, value: string) => {
  if (emitterValue && emitterValue.set) {
    emitterValue.set.call(el, value);
  }

  emitChange(el);
};

const emitterChecked = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked');

export const emitChecked = (el: HTMLInputElement, value: boolean) => {
  if (emitterChecked && emitterChecked.set) {
    emitterChecked.set.call(el, value);
  }

  emitChange(el);
};
