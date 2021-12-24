import { context } from './context.js';

export const dom = typeof context.document !== 'undefined';
