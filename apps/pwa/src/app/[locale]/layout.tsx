import { ReactScan } from "@/lib/react-scan";
import { type Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import { type ParamsWithLocale } from "@/types/common";
import { getMessages, setRequestLocale } from "next-intl/server";
import { fonts } from "@/fonts.config";
import { NextIntlClientProvider } from "next-intl";
import { ServiceWorkerProvider } from "@/service-worker/client/provider";
import { getSession } from "@/api/auth/get-session";
import { ReactQueryClientProvider } from "@/providers/react-query-provider";
import { StandaloneProvider } from "@/providers/standalone.provider";
import { SessionStoreProvider } from "@/features/session";
import { locales } from "@/i18n/locales";
import { headers } from "next/headers";

import "../globals.scss";
import { QuerySelectorProvider } from "@/providers/query-selector.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { ThemeColorManager } from "@/providers/theme-color-manager";



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
            <head>
                <ReactScan />
            </head>
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
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="system"
                                    enableSystem
                                    disableTransitionOnChange
                                >
                                    <ThemeColorManager />
                                    <StandaloneProvider>
                                        <QuerySelectorProvider>
                                            <main id={"main"}>
                                                {children}
                                            </main>
                                            <div id="bottom-sheet-root" />
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
