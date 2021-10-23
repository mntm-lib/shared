import type { PropsWithChildren, PropsWithoutRef } from 'react';

import { createContext, createElement } from 'react';

type ContextRecord = Record<string, unknown>;
type ContextProps = PropsWithoutRef<ContextRecord>;

export const createContextComponent = <P extends ContextProps, H = ContextRecord>(handlerCreator: (props: P) => H) => {
  const Context = createContext<H>(null as unknown as H);

  const Provider = (props: PropsWithChildren<P>) => {
    return createElement(Context.Provider, {
      value: handlerCreator(props)
    }, props.children); // eslint-disable-line react/destructuring-assignment
  };

  return {
    Provider,
    Context
  } as const;
};
