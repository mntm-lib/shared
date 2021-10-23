import type { Dispatch, FC, SetStateAction } from 'react';

import { createContext, createElement } from 'react';
import { noop } from '../../fn/index.js';

type ContextUpdate<T> = Dispatch<SetStateAction<T>>;
type ContextRecord<T> = {
  value: T;
  update: ContextUpdate<T>;
};
type ContextCreator<T> = () => ContextRecord<T>;

export const createSplittedContext = <T = unknown>(handlerCreator: ContextCreator<T>) => {
  const Context = {
    Value: createContext(null as unknown as T),
    Update: createContext(noop as unknown as ContextUpdate<T>)
  } as const;

  const Provider: FC = ({ children }) => {
    const created = handlerCreator();

    return createElement(Context.Update.Provider, {
      value: created.update,
      children: createElement(Context.Value.Provider, {
        value: created.value,
        children
      })
    });
  };

  return {
    Provider,
    Context
  } as const;
};
