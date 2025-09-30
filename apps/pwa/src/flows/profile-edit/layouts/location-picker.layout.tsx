import { PropsWithChildren } from "react";
import { LocationSearchProvider } from "@/features/location/search";

export namespace EditProfileLocationPickerLayout {
    export type Props = never;
}

export function EditProfileLocationPickerLayout({ children }: PropsWithChildren) {
    return (
        <LocationSearchProvider
            syncFormField={"location"}
            callbackUrl={"/profile/edit"}
            confirmUrl={"/profile/edit/location/confirm"}
        >
            {children}
        </LocationSearchProvider>
    );
}
