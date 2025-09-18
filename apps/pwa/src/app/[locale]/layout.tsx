import { PropsWithChildren } from "react";
import { type Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { fonts } from "@/fonts.config";

import { ServiceWorkerProvider } from "@/service-worker/client";
import { ReactQueryClientProvider } from "@/providers/react-query-provider";
import { StandaloneProvider } from "@/providers/standalone.provider";
import { QuerySelectorProvider } from "@/providers/query-selector.provider";
import { pwaStandaloneChecker } from "@/lib/standalone";

import { type ParamsWithLocale } from "@/types/common";

import "../globals.scss";
import { SharedClassNames } from "@/theme/shared/class-names";

export const metadata: Metadata = {
    title: "Reevel",
    description: "Easily bring people together. Reevel turns simple moments into lasting memories.",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent", // or ""
        title: "Reevel",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
        { media: "(prefers-color-scheme: light)", color: "#F7F7F7" },
    ],
};

export default async function RootLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

    setRequestLocale(locale);
    const messages = await getMessages();

    const pwaScript = `(${pwaStandaloneChecker.toString()})();`;

    return (
        <html lang={locale} suppressHydrationWarning className={"display-browser"}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: pwaScript,
                    }}
                />
            </head>
            <body className={fonts}>
                <ServiceWorkerProvider register={process.env.SERVICE_WORKER === "true"}>
                    <NextIntlClientProvider
                        locale={locale}
                        messages={messages}
                    >
                        <ReactQueryClientProvider>
                            <StandaloneProvider>
                                <QuerySelectorProvider>
                                    <main id={"main"} className={SharedClassNames.PbStandalone}>
                                        {children}
                                    </main>
                                    <div id={"modal-root"} />
                                </QuerySelectorProvider>
                            </StandaloneProvider>
                        </ReactQueryClientProvider>
                    </NextIntlClientProvider>
                </ServiceWorkerProvider>
            </body>
        </html>
    );
}
