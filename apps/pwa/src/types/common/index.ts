import { type locales } from "@/i18n/locales";

export type Locale = (typeof locales)[number];

export type ParamsWithLocale<P = unknown> = {
    params: Promise<P & {
        locale: Locale
    }>
};

export type UISize = "default" | "small" | "large" | "xsmall";