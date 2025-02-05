import { type IntlConfig, NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { ServiceWorkerProvider } from "@/service-worker/provider";

type ProvidersProps = {
  intlConfig: IntlConfig
}

export const Providers = ({ children, intlConfig }: PropsWithChildren<ProvidersProps>) => {
    return (
        <ServiceWorkerProvider>
            <NextIntlClientProvider {...intlConfig}>
                {children}
            </NextIntlClientProvider>
        </ServiceWorkerProvider>
    );
};