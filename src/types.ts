export type Predicate<T> = (item: T) => boolean;

export type Nullable<T> = T | null;

export type Optional<T> = T | null | undefined;

export type AnyFunction = (...args: any[]) => any;
