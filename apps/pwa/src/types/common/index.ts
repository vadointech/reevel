import { type locales } from "@/i18n/locales";
import { FetchQueryOptions } from "@tanstack/react-query";

export type Locale = (typeof locales)[number];

export type ParamsWithLocale<P = unknown> = {
    params: Promise<P & {
        locale: Locale
    }>
};

export type UISize = "default" | "small" | "large" | "xsmall";

export type UIMode = "dark" | "light" | "system";


export interface MobxStore {
    dispose(): void;
}

type QueryBuilderMethods = {
    queryKey: (params: unknown[]) => unknown[];
};
export type QueryBuilder<
    Params extends object = Record<string, any>,
    TData = unknown,
    TMethods extends Record<string, (...params: any) => unknown> = QueryBuilderMethods,
> = TMethods & QueryBuilderMethods & {
    (metadata: Params): FetchQueryOptions<TData>;
};