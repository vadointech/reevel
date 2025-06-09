import { ChangeEvent, useCallback } from "react";
import { UseMutationOptions } from "@tanstack/react-query";
import { useImageUploaderContext } from "../image-uploader.context";
import { UploadFile } from "@/api/upload";

type Params = Partial<Omit<UseMutationOptions<UploadFile.TOutput, unknown, UploadFile.TInput>, "mutationFn">> & {
    onFileSelected?: (src: string) => void;
};

export function useImageUploader(params: Params = {}) {
    const imageUploader = useImageUploaderContext();

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
    //
    // const uploadFileMutation = useMutation<UploadFile.TOutput, unknown, UploadFile.TInput>({
    //     mutationKey: UploadFile.queryKey,
    //     mutationFn: (body) =>
    //         uploadFile({ body })
    //             .then(response => response.data),
    //     onMutate: (...args) => {
    //         fileUploader.store.setLoading(true);
    //         params.onMutate?.(...args);
    //     },
    //     onSettled: (data, ...args) => {
    //         fileUploader.store.setLoading(false);
    //         if(data) {
    //             if(!isUploadErrorResponse(data[0])) {
    //                 fileUploader.store.setUploadResponse(data[0]);
    //             } else {
    //                 fileUploader.store.setUploadErrorResponse(data[0]);
    //             }
    //         }
    //         params.onSettled?.(data, ...args);
    //     },
    //     ...params,
    // });
    //
    // const handleUploadFile = useCallback((file: Blob | null) => {
    //     if(file) uploadFileMutation.mutateAsync({ file });
    // }, [uploadFileMutation]);

    return {
        handleSelectFile,
    };
}