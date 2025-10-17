"use client";

import { useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { CreateEventFormSchemaValues } from "@/features/event/create";
import { useImageUploaderContext } from "@/features/uploader/image";
import { useFileSelect } from "@/features/uploader/hooks";
import { UploadEventPosterMutation } from "@/features/event/create/queries";

export function useCreateEventPosterUpload(callbackUrl?: string) {
    const router = useRouter();
    const form = useFormContext<CreateEventFormSchemaValues>();
    const imageUploader = useImageUploaderContext();

    const handleSelectFile = useFileSelect({
        onFileSelected: (src) => {
            imageUploader.controller.setImageSrc(src);
        },
    });

    const uploadFileMutation = useMutation({
        ...UploadEventPosterMutation,
        onSuccess: (data) => {
            if(data && data[0]) {
                form.setValue("poster", {
                    id: data[0].id,
                    fileUrl: data[0].fileUrl,
                });
                form.setValue("primaryColor", data[0].colorPalette[0]);
                if(callbackUrl) router.replace(callbackUrl);
            }
        },
    });
    const handleCropPoster = useCallback(() => {
        imageUploader.controller.cropImage().then(uploadFileMutation.mutate);
    }, []);

    return {
        handleSelectFile,
        handleCropPoster,

        isUploading: uploadFileMutation.isPending,
    };
}