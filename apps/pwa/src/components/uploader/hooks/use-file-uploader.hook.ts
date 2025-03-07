import { ChangeEvent, useState } from "react";

type Params = {
    onFileUpload?: (src: string) => void
};

export function useFileUploader({
    onFileUpload,
}: Params = {}) {
    const [imageSrc, setImageSrc] = useState("");

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const src = reader.result?.toString() || "";
                setImageSrc(src);
                onFileUpload?.(src);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return {
        imageSrc,
        handleFileUpload,
    };
}