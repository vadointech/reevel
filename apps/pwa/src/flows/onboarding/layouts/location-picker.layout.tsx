import { PropsWithChildren } from "react";
import { LocationSearchProvider } from "@/features/location/search";

export namespace OnboardingLocationPickerLayout {
    export type Props = never;
}

export function OnboardingLocationPickerLayout({ children }: PropsWithChildren) {
    return (
        <LocationSearchProvider
            syncFormField={"location"}
            callbackUrl={"/onboarding/location"}
            confirmUrl={"/onboarding/location/confirm"}
        >
            { children }
        </LocationSearchProvider>
    );
}
