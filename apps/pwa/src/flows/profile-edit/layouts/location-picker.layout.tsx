import { PropsWithChildren } from "react";
import { LocationSearchProvider } from "@/features/location/search";

export namespace EditProfileLocationPickerLayout {
    export type Props = never;
}

export function EditProfileLocationPickerLayout({ children }: PropsWithChildren) {
    return (
        <LocationSearchProvider
            syncFormField={"location"}
            callbackUrl={"/profile/update"}
            confirmUrl={"/profile/update/location/confirm"}
        >
            {children}
        </LocationSearchProvider>
    );
}
