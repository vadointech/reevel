export {};

declare global {
  type Maybe<T> = T | null | undefined;
  type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  type ObjectValues<T extends Record<string, any>> = T[keyof T];
  type ObjectEntries<T extends Record<string, any>> = Array<[keyof T, T[keyof T]]>;
  type ArrayValues<T extends readonly any[]> = T[number];
  type EnumValues<E> = E[keyof E];
  export type DeepPartial<T> = T | (T extends Array<infer U> ? DeepPartial<U>[] : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>> : T extends Set<infer M> ? Set<DeepPartial<M>> : T extends object ? {
      [K in keyof T]?: DeepPartial<T[K]>;
  } : T);
}