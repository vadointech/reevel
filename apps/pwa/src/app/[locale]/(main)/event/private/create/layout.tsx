import { PropsWithChildren } from "react";
import { CreateEventFormProvider } from "@/features/event/create";
import { EventVisibility } from "@/entities/event";
import { ImageUploaderProvider } from "@/features/uploader/image";

export default async function CreateEventLayout({ children }: PropsWithChildren) {
    return (
        <CreateEventFormProvider visibility={EventVisibility.PRIVATE}>
            <ImageUploaderProvider>
                { children }
            </ImageUploaderProvider>
        </CreateEventFormProvider>
    );
}