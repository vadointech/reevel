import { PropsWithChildren } from "react";

import { CreateEventFormProvider } from "@/features/event/create";
import { EventVisibility } from "@/entities/event";
import { ImageUploaderProvider } from "@/features/uploader/image";

export namespace CreateEventRootLayout {
    export type Props = PropsWithChildren<{
        type: EventVisibility;
    }>;
}

export const CreateEventRootLayout = ({
    type,
    children,
}: CreateEventRootLayout.Props) => {
    return (
        <CreateEventFormProvider visibility={type}>
            <ImageUploaderProvider>
                { children }
            </ImageUploaderProvider>
        </CreateEventFormProvider>
    );
};
