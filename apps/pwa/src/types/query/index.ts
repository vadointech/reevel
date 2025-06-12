import { FetchQueryOptions } from "@tanstack/react-query";

interface IQueryBuilderMethods {
    queryKey: (params?: unknown[]) => unknown[];
}

export type QueryBuilderQuery<
    TInput extends object = Record<string, any>,
    TData = unknown,
    TMethods extends IQueryBuilderMethods | null = IQueryBuilderMethods,
> = (
  TMethods extends IQueryBuilderMethods
      ? ((input: TInput) => FetchQueryOptions<TData>) & TMethods
      : ((input: TInput) => FetchQueryOptions<TData>)
);

export type QueryBuilder<
    TInput extends object = Record<string, any>,
    TData = unknown,
    TInjected extends object | null = null,
    TMethods extends IQueryBuilderMethods = IQueryBuilderMethods,
> = TMethods & (
        TInjected extends object
            ? (injected: TInjected) => QueryBuilderQuery<TInput, TData, null>
            : () => QueryBuilderQuery<TInput, TData, null>
);