import { FetchQueryOptions } from "@tanstack/react-query";

export interface IQueryBuilderMethods<TInput extends object, TData, TInjected = null> {
    queryKey: (params?: unknown[]) => unknown[];
    queryFunc:
    TInjected extends object
        ? (input: TInput & TInjected) => Promise<TData>
        : (input: TInput) => Promise<TData>;
}

export type QueryBuilderQuery<
    TInput extends object = Record<string, any>,
    TData = unknown,
    TMethods extends IQueryBuilderMethods<TInput, TData> | null = IQueryBuilderMethods<TInput, TData>,
> = (
  TMethods extends IQueryBuilderMethods<TInput, TData>
      ? ((input: TInput) => FetchQueryOptions<TData>) & TMethods
      : ((input: TInput) => FetchQueryOptions<TData>)
);

export type QueryBuilder<
    TInput extends object = Record<string, any>,
    TData = unknown,
    TInjected extends object | null = null,
    TMethods extends IQueryBuilderMethods<TInput, TData, TInjected> = IQueryBuilderMethods<TInput, TData, TInjected>,
> = TMethods & (
        TInjected extends object
            ? (injected: TInjected) => QueryBuilderQuery<TInput, TData, null>
            : () => QueryBuilderQuery<TInput, TData, null>
);