import { PropsWithChildren } from "react";
import { ParamsWithLocale } from "@/types/common";
import { OnboardingRootLayout } from "@/flows/onboarding/layouts";

export const dynamic = "force-dynamic";

export default async function OnboardingLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

    return (
        <OnboardingRootLayout
            children={children}
            locale={locale}
        />
    );
}