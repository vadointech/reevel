import { PropsWithChildren } from "react";
import { LocationPickerProvider } from "@/components/screens/location-picker";

export default function CreateEventLocationLayout({ children }: PropsWithChildren) {
    return (
        <LocationPickerProvider
            confirmationUrl={"/event/create/location/confirm"}
            locationSearchUrl={"/event/create/location/search"}
        >
            { children }
        </LocationPickerProvider>
    );
}