import { OnboardingLocationPickerLayout } from "@/flows/onboarding/layouts";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <OnboardingLocationPickerLayout>
            { children }
        </OnboardingLocationPickerLayout>
    );
}