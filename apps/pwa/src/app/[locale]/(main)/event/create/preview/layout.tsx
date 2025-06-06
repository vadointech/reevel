import { PropsWithChildren } from "react";
import { ImageUploaderProvider } from "@/features/uploader/image";
import { FileUploaderProvider } from "@/features/uploader";

export default function CreateEventPreviewProvider({ children }: PropsWithChildren) {
    return (
        <FileUploaderProvider>
            <ImageUploaderProvider>
                { children }
            </ImageUploaderProvider>
        </FileUploaderProvider>
    );
}