import { PropsWithChildren } from "react";
import { type Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { fonts } from "@/fonts.config";
import { defaultMetadata } from "@/metadata.config";

import { ServiceWorkerProvider } from "@/service-worker/client";
import { ReactQueryClientProvider } from "@/providers/react-query-provider";
import { StandaloneProvider } from "@/providers/standalone.provider";
import { QuerySelectorProvider } from "@/providers/query-selector.provider";
import { standaloneDocumentChecker } from "@/utils/display-mode";

import { SharedClassNames } from "@/theme/shared/class-names";

import { type ParamsWithLocale } from "@/types/common";

import "../globals.scss";

export const metadata: Metadata = {
    title: "Reevel | Find Local Events & Meet New People Near You",
    description: "Reevel is a social app that helps you find local events and meet new people nearby. From board games and live music to casual hangouts — explore things to do tonight or create your own event in minutes.",
    keywords: ["events", "meetups", "find friends", "social platform", "local events", "hobbies", "community"],

    alternates: {
        canonical: "/discover",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },

    icons: [
        { url: "/icons/icon_x192.png", type: "image/png", sizes: "192x192" },
        { url: "/icons/icon_x512.png", type: "image/png", sizes: "512x512" },
        { url: "/icons/icon_x1024.png", type: "image/png", sizes: "1024x1024" },
    ],

    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent", // or ""
        title: "Reevel",
    },

    openGraph: defaultMetadata.openGraph,
    twitter: defaultMetadata.twitter,
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

    const pwaScript = `(${standaloneDocumentChecker.toString()})();`;

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
