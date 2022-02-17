import type { Dispatch, FC, PropsWithChildren, PropsWithoutRef, SetStateAction } from 'react';

import { createContext, createElement } from 'react';
import { noop } from '../../fn/index.js';

type ContextUpdate<T> = Dispatch<SetStateAction<T>>;
type ContextRecord<T> = {
  value: T;
  update: ContextUpdate<T>;
};

type ContextProps = PropsWithoutRef<Record<string, unknown>>;

export const createSplittedContext = <P extends ContextProps, H = unknown>(handlerCreator: (props: P) => ContextRecord<H>) => {
  const Context = {
    Value: createContext(null as unknown as H),
    Update: createContext(noop as unknown as ContextUpdate<H>)
  } as const;

  const Provider: FC<PropsWithChildren<P>> = (props) => {
    /* eslint-disable react/no-children-prop, react/destructuring-assignment */

    const created = handlerCreator(props);

    return createElement(Context.Update.Provider, {
      value: created.update,
      children: createElement(Context.Value.Provider, {
        value: created.value,
        children: props.children
      })
    });
  };

  return {
    Provider,
    Context
  } as const;
};
