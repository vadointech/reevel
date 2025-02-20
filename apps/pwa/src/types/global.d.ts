export {};

declare global {
  type Maybe<T> = T | null | undefined;
  type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
}