import { ChangeEvent, useCallback } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useImageUploaderContext } from "../image-uploader.context";
import { uploadFile, UploadFile } from "@/api/upload";
import { useFileUploaderContext } from "@/features/uploader";

type Params = Partial<Omit<UseMutationOptions<UploadFile.TOutput, unknown, UploadFile.TInput>, "mutationFn">> & {
    onFileSelected?: (src: string) => void;
};

export function useImageUploader(params: Params = {}) {
    const imageUploader = useImageUploaderContext();
    const fileUploader = useFileUploaderContext();

    const handleSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const src = reader.result?.toString() || "";
                imageUploader.controller.setImageSrc(src);
                params.onFileSelected?.(src);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }, []);

    const uploadFileMutation = useMutation<UploadFile.TOutput, unknown, UploadFile.TInput>({
        mutationKey: UploadFile.queryKey,
        mutationFn: (body) =>
            uploadFile({ body })
                .then(response => response.data),
        onMutate: (...args) => {
            fileUploader.store.setLoading(true);
            params.onMutate?.(...args);
        },
        onSettled: (data, ...args) => {
            fileUploader.store.setLoading(false);
            if(data) {
                fileUploader.store.setFileUrl(data[0].secure_url);
            }
            params.onSettled?.(data, ...args);
        },
        ...params,
    });

    const handleUploadFile = useCallback((file: Blob | null) => {
        if(file) uploadFileMutation.mutateAsync({ file });
    }, [uploadFileMutation]);

    return {
        handleSelectFile,
        handleUploadFile,
    };
}