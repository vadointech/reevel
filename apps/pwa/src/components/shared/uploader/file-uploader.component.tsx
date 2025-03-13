import { ComponentProps, memo } from "react";
import { useFileUploader } from "./hooks/use-file-uploader.hook";

export namespace FileUploader {
    export type Props = ComponentProps<"div"> & {
        onFileUpload?: (src: string) => void;
    };
}

export const FileUploader = memo(({
    onFileUpload,
    ...props
}: FileUploader.Props) => {
    const {
        handleShowFilePicker,
    } = useFileUploader({ onFileUpload });

    return (
        <div {...props} onClick={handleShowFilePicker} />
    );
});
