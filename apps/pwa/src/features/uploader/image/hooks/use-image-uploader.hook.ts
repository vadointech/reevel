import { ChangeEvent, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useImageUploaderContext } from "../image-uploader.context";
import { UserUploadsEntity } from "@/entities/uploads";
import { FetcherErrorResponse } from "@/lib/fetcher/types";

type TMutationInput = {
    file: Blob;
};

type ConfigParams = UseMutationOptions<UserUploadsEntity | null, FetcherErrorResponse, TMutationInput> & {
    onFileSelected?: (src: string) => void;
    callbackUrl?: string;
};

export function useImageUploader({
    onFileSelected,
    callbackUrl,
    ...mutation
}: ConfigParams = {}) {
    const imageUploader = useImageUploaderContext();
    const router = useRouter();

    const handleSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const src = reader.result?.toString() || "";
                imageUploader.controller.setImageSrc(src);
                onFileSelected?.(src);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);

    const uploadFileMutation = useMutation({
        ...mutation,
        onSuccess: (upload, ...args) => {
            if(!upload) return;
            mutation.onSuccess?.(upload, ...args);
            if(callbackUrl) router.push(callbackUrl);
        },
    });

    const handleFileUpload = useCallback((file?: Blob | null) => {
        if(file) uploadFileMutation.mutateAsync({ file });
    }, []);

    return {
        handleSelectFile,
        handleFileUpload,
    };
}