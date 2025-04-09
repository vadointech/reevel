"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/api/upload";
import { useCropperStore } from "@/components/shared/uploader/cropper";
import { useSessionStore } from "@/features/session";

export function useAvatarUpload() {
    const cropperStore = useCropperStore();
    const sessionStore = useSessionStore();

    const { mutate } = useMutation({
        mutationFn: uploadFile,
        onSuccess: ({ data }) => {
            sessionStore.updateSession({
                profile: {
                    picture: data?.[0].secure_url,
                },
            });
        },
        onSettled: () => {
            cropperStore.cleanup();
        },
    });

    const handleUploadAvatar = (file: Blob) => {
        console.log(file)
        mutate({
            body: { file },
        });
    };

    return {
        drawerOpen: !!cropperStore.imgSrc,
        handleUploadAvatar,
    };
}