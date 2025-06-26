import { type locales } from "@/i18n/locales";

export type Locale = (typeof locales)[number];

export type PropsWithParams<P = unknown> = {
    params: Promise<P>
};

export type ParamsWithLocale<P = unknown> = PropsWithParams<P & { locale: Locale }>;

export type UISize = "default" | "small" | "large" | "xsmall";