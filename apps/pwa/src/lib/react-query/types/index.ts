import { FetchQueryOptions } from "@tanstack/react-query";

export interface IQueryBuilderMethods<TInput, TData, TInjected = null> {
    queryKey: (params?: unknown[]) => unknown[];
    queryFunc:
    TInjected extends object ?
        TInput extends null ?
            (input: TInjected) => Promise<TData> : (input: TInput & TInjected) => Promise<TData> :
        TInput extends null ?
            () => Promise<TData> : (input: TInput) => Promise<TData>;
}

export type QueryBuilderQuery<
    TInput,
    TData = unknown,
    TMethods extends IQueryBuilderMethods<TInput, TData> | null = IQueryBuilderMethods<TInput, TData>,
> = (
  TInput extends null ?
      TMethods extends IQueryBuilderMethods<TInput, TData> ?
      (() => FetchQueryOptions<TData>) & TMethods : (() => FetchQueryOptions<TData>) :
      TMethods extends IQueryBuilderMethods<TInput, TData>
          ? ((input: TInput) => FetchQueryOptions<TData>) & TMethods : ((input: TInput) => FetchQueryOptions<TData>)
);

export type QueryBuilder<
    TInput,
    TData = unknown,
    TInjected extends object | null = null,
    TMethods extends IQueryBuilderMethods<TInput, TData, TInjected> = IQueryBuilderMethods<TInput, TData, TInjected>,
> = TMethods & (
        TInjected extends object
            ? (injected: TInjected) => QueryBuilderQuery<TInput, TData, null>
            : () => QueryBuilderQuery<TInput, TData, null>
);