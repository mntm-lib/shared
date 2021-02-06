export const shallowEqual = (a: any, b: any) => {
  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  for (const i in a) {
    if (!(i in b)) {
      return false;
    }
  }

  for (const i in b) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

export const shallowEqualDeps = (a: readonly any[], b: readonly any[]) => {
  if (a === b) {
    return true;
  }
  for (let i = a.length; i--;) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

let _weakId = 0;
export const weakUnique = () => Math.floor(Math.random() * 1E6).toString(32);
export const weakUniqueId = () => (++_weakId) + weakUnique();
