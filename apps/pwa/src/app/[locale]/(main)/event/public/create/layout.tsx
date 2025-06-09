import { PropsWithChildren } from "react";
import { CreateEventFormProvider } from "@/features/event/create";
import { ImageUploaderProvider } from "@/features/uploader/image";
import { EventVisibility } from "@/entities/event";

export default async function CreateEventLayout({ children }: PropsWithChildren) {
    return (
        <CreateEventFormProvider visibility={EventVisibility.PUBLIC}>
            <ImageUploaderProvider>
                { children }
            </ImageUploaderProvider>
        </CreateEventFormProvider>
    );
}