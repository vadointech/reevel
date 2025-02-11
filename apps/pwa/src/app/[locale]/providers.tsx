import { type IntlConfig, NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";

type ProvidersProps = {
    intlConfig: IntlConfig
};

export const Providers = ({ children, intlConfig }: PropsWithChildren<ProvidersProps>) => {
    return (
        <NextIntlClientProvider {...intlConfig}>
            {children}
        </NextIntlClientProvider>
    );
};