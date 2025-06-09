import { PropsWithChildren } from "react";
import { LocationPickerProvider } from "@/features/location/picker";

export default function CreateEventLocationLayout({ children }: PropsWithChildren) {
    return (
        <LocationPickerProvider
            syncFormField={"location"}
            callbackUrl={"/event/private/create"}
            locationSearchUrl={"/event/private/create/location/search"}
        >
            { children }
        </LocationPickerProvider>
    );
}