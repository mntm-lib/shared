import type { PropsWithChildren, PropsWithoutRef } from 'react';

import { createContext, createElement } from 'react';

type ContextRecord = Record<string, unknown>;
type ContextProps = PropsWithoutRef<ContextRecord>;

export const createContextComponent = <P extends ContextProps, H = ContextRecord>(handlerCreator: (props: P) => H) => {
  const Context = createContext<H>(undefined as unknown as H);

  const Provider = (props: PropsWithChildren<P>) => (
    createElement(Context.Provider, {
      value: handlerCreator(props)
    }, props.children)
  );

  return {
    Provider: Provider,
    Consumer: Context.Consumer,
    Context
  };
};
