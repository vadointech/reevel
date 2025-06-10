import { PropsWithChildren } from "react";
import { LocationPickerProvider } from "@/features/location/picker";

export namespace CreateEventLocationPickerLayout {
    export type Props = PropsWithChildren<{
        callbackUrl: string;
        locationSearchUrl: string;
    }>;
}

export const CreateEventLocationPickerLayout = ({
    children,
    callbackUrl,
    locationSearchUrl,
}: CreateEventLocationPickerLayout.Props) => {
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
