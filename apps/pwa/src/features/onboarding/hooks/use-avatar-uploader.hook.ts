import { useSessionStore } from "@/features/session";
import { useUploadedFileDelete } from "@/features/uploader/hooks";
import { useCallback, useRef } from "react";
import { UserUploadsEntity } from "@/entities/uploads";
import { useImageUploader } from "@/features/uploader/image/hooks";
import { uploadProfileAvatar } from "@/api/profile/upload-avatar";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";

export function useOnboardingAvatarUploader(callbackUrl?: string) {
    const sessionStore = useSessionStore();

    const uploadDrawerController = useRef<IBottomSheetRootController>(null);

    const {
        handleFileDelete: handleAvatarDelete,
    } = useUploadedFileDelete();

    const handleAvatarPick = useCallback((upload: UserUploadsEntity) => {
        sessionStore.updateSession({
            profile: {
                picture: upload.fileUrl,
            },
        });
        uploadDrawerController.current?.close();
    }, []);

    const { handleSelectFile, handleFileUpload } = useImageUploader({
        callbackUrl,
        mutationFn: (body) =>
            uploadProfileAvatar({ body })
                .then(response => response.data ? response.data[0] : null),
        onSuccess: (upload) => {
            if(upload) handleAvatarPick(upload);
        },
    });

    return {
        sessionStore,
        handleSelectFile,
        handleFileUpload,
        handleAvatarPick,
        handleAvatarDelete,
        uploadDrawerController,
    };
}