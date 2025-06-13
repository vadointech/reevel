import { PropsWithChildren } from "react";
import { type Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { getSession } from "@/api/auth";

import { locales } from "@/i18n/locales";
import { fonts } from "@/fonts.config";

import { ServiceWorkerProvider } from "@/service-worker/client";
import { ReactQueryClientProvider } from "@/providers/react-query-provider";
import { StandaloneProvider } from "@/providers/standalone.provider";
import { QuerySelectorProvider } from "@/providers/query-selector.provider";
import { SessionStoreProvider } from "@/features/session";
import { ThemeProvider } from "@/providers/theme.provider";

import { type ParamsWithLocale } from "@/types/common";

import "../globals.scss";

export const metadata: Metadata = {
    title: "Reevel",
    description: "Easily bring people together. Reevel turns simple moments into lasting memories.",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent", // або ""
        title: "Reevel",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
        { media: "(prefers-color-scheme: light)", color: "#F7F7F7" },
    ],
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

    setRequestLocale(locale);
    const messages = await getMessages();

    const { data } = await getSession({
        nextHeaders: await headers(),
    });

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={fonts} >
                <ServiceWorkerProvider register={process.env.SERVICE_WORKER === "true"}>
                    <NextIntlClientProvider
                        locale={locale}
                        messages={messages}
                    >
                        <ReactQueryClientProvider>
                            <SessionStoreProvider
                                init={[{
                                    user: data,
                                }]}
                            >
                                <ThemeProvider enableSystem>
                                    <StandaloneProvider>
                                        <QuerySelectorProvider>
                                            <main id={"main"}>
                                                {children}
                                            </main>
                                            <div id={"modal-root"} />
                                        </QuerySelectorProvider>
                                    </StandaloneProvider>
                                </ThemeProvider>
                            </SessionStoreProvider>
                        </ReactQueryClientProvider>
                    </NextIntlClientProvider>
                </ServiceWorkerProvider>
            </body>
        </html>
    );
}
