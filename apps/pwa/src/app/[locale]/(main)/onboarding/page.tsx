import { ParamsWithLocale } from "@/types/common";
import { OnboardingRootPage } from "@/flows/onboarding/pages";

export default async function Page({ params }: ParamsWithLocale) {
    const { locale } = await params;

    return (
        <OnboardingRootPage locale={locale} />
    );
}