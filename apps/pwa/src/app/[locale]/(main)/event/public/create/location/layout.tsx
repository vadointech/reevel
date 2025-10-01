import { PropsWithChildren } from "react";
import { CreateEventLocationPickerLayout } from "@/flows/create-event/layouts";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <CreateEventLocationPickerLayout
            children={children}
            callbackUrl={"/event/public/create"}
            locationSearchUrl={"/event/public/create/location/search"}
        />
    );
}