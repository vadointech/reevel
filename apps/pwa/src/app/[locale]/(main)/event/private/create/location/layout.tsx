import { PropsWithChildren } from "react";
import { CreateEventLocationPickerLayout } from "@/flows/create-event/layouts";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <CreateEventLocationPickerLayout
            children={children}
            callbackUrl={"/event/private/create"}
            locationSearchUrl={"/event/private/create/location/search"}
        />
    );
}