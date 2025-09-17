import { PropsWithChildren } from "react";
import { LocationPickerProvider } from "@/features/location/picker";

export namespace EditProfileLocationPickerLayout {
    export type Props = PropsWithChildren<{
        callbackUrl: string;
        locationSearchUrl: string;
    }>;
}

export const EditProfileLocationPickerLayout = ({
    children,
    callbackUrl,
    locationSearchUrl,
}: EditProfileLocationPickerLayout.Props) => {
    return (
        <LocationPickerProvider
            syncFormField={"location"}
            callbackUrl={callbackUrl}
            locationSearchUrl={locationSearchUrl}
        >
            { children }
        </LocationPickerProvider>
    );
};
