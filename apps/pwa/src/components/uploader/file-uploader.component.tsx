import { ComponentProps, memo } from "react";
import { useFileUploader } from "./hooks/use-file-uploader.hook";

export namespace FileUploader {
    export type Props = ComponentProps<"input"> & {
        onFileUpload?: (src: string) => void;
    };
}

export const FileUploader = memo(({
    onFileUpload,
    ...props
}: FileUploader.Props) => {
    const {
        handleFileUpload,
    } = useFileUploader({ onFileUpload });

    return (
        <input
            type={"file"}
            accept={"image/*"}
            {...props}
            onChange={handleFileUpload}
        />
    );
});
