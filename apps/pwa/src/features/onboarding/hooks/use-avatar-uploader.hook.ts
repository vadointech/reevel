import { useSessionContext } from "@/features/session";
import { useUploadedFileDelete } from "@/features/uploader/hooks";
import { useCallback, useRef } from "react";
import { SupportedFileCollections, UserUploadsEntity } from "@/entities/uploads";
import { useImageUploader } from "@/features/uploader/image/hooks";
import { uploadProfileAvatar } from "@/api/profile/server";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";
import { revalidateSessionTag } from "@/features/cache";
import { GetUserUploads } from "@/api/user";
import { useOnboardingFormContext } from "@/features/onboarding";

export function useOnboardingAvatarUploader(callbackUrl?: string) {
    const session = useSessionContext();
    const form = useOnboardingFormContext();

    const uploadDrawerController = useRef<IBottomSheetRootController>(null);

    const handleAvatarDelete = useUploadedFileDelete();

    const handleAvatarPick = useCallback((upload: UserUploadsEntity) => {
        form.setValue("picture", upload.fileUrl);
        form.store.setPictureToSelect(upload.fileUrl);

        uploadDrawerController.current?.close();
    }, []);

    const { handleSelectFile, handleFileUpload } = useImageUploader({
        callbackUrl,
        mutationFn: uploadProfileAvatar,
        onSuccess: (upload) => {
            if(upload) handleAvatarPick(upload);

            const { user } = session.store.toPlainObject();
            return revalidateSessionTag(user, [...GetUserUploads.queryKey, SupportedFileCollections.PROFILE_PICTURE]);
        },
    });

    return {
        handleSelectFile,
        handleFileUpload,
        handleAvatarPick,
        handleAvatarDelete,
        uploadDrawerController,
    };
}