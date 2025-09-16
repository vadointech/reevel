import { PropsWithChildren } from "react";
import { OnboardingRootLayout } from "@/flows/onboarding/layouts";

export default async function OnboardingLayout(props: PropsWithChildren) {
    return <OnboardingRootLayout {...props} />;
}