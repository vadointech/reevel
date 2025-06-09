import { PropsWithChildren } from "react";
import { CreateEventRootLayout } from "@/flows/create-event/layouts";
import { EventVisibility } from "@/entities/event";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <CreateEventRootLayout type={EventVisibility.PUBLIC}>
            { children }
        </CreateEventRootLayout>
    );
}