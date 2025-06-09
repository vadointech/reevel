import { PropsWithChildren } from "react";
import { LocationPickerProvider } from "@/features/location/picker";

export default function CreateEventLocationLayout({ children }: PropsWithChildren) {
    return (
        <LocationPickerProvider
            syncFormField={"location"}
            callbackUrl={"/event/public/create"}
            locationSearchUrl={"/event/public/create/location/search"}
        >
            { children }
        </LocationPickerProvider>
    );
}