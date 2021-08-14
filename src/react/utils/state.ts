import type { Dispatch, SetStateAction } from 'react';

export const extractState = <S>(setState: Dispatch<SetStateAction<S>>) => {
  let state;

  setState((value) => {
    state = value;

    return value;
  });

  return state;
};
