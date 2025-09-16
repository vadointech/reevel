import { OnboardingLocationPickerPage } from "@/flows/onboarding/pages";

export const revalidate = 3600;

export default async function Page() {
    return (
        <OnboardingLocationPickerPage />
    );
}