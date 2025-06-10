import { ParamsWithLocale } from "@/types/common";
import { OnboardingLocationPickerPage } from "@/flows/onboarding/pages";

export default async function Page({ params }: ParamsWithLocale) {
    const { locale } = await params;

    return (
        <OnboardingLocationPickerPage locale={locale} />
    );
}