"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/api/upload";
import { useCropperStore } from "@/components/shared/uploader/cropper";
import { useEventStore } from ".";

export function useEventPosterUpload() {
    const cropperStore = useCropperStore();
    const eventStore = useEventStore();

    const { mutate } = useMutation({
        mutationFn: uploadFile,
        onSuccess: ({ data }) => {
            eventStore.setPoster(data?.[0].secure_url);
        },
        onSettled: () => {
            cropperStore.cleanup();
        },
    });

    const handleUploadPoster = (file: Blob) => {
        mutate({
            body: { file },
        });
    };

    return {
        drawerOpen: !!cropperStore.imgSrc,
        handleUploadPoster,
    };
}