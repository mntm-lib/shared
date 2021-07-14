import type { ReactNode, ReactElement } from 'react';

export { unstable_batchedUpdates as batch } from 'react-dom';

/** @nosideeffects */
export const castRender = /*#__INLINE__*/(render: ReactNode) => render as unknown as ReactElement | null;
