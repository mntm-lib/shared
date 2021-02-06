import type { DependencyList, ReactNode, ReactElement } from 'react';

export { unstable_batchedUpdates as batch } from 'react-dom';

export const constRef = {} as const;
export const constExoticDeps: any[] = [];
export const constDeps: DependencyList = constExoticDeps;

export const castRender = (render: ReactNode) => render as unknown as ReactElement | null;
