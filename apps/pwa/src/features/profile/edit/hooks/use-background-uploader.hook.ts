import { useSessionContext } from "@/features/session";
import { useUploadedFileDelete } from "@/features/uploader/hooks";
import { useCallback, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { SupportedFileCollections, UserUploadsEntity } from "@/entities/uploads";
import { useImageUploader } from "@/features/uploader/image/hooks";

import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";
import { revalidateSessionTag } from "@/features/cache";
import { GetUserUploads } from "@/api/user";
import { useEditProfileFormContext } from "../edit-profile-form.context";
import { uploadProfileAvatar } from "@/api/profile/server";

export function useEditProfileBackGroundUploader(callbackUrl?: string) {
    const router = useRouter();
    const session = useSessionContext();
    const form = useEditProfileFormContext();

    const uploadDrawerController = useRef<IBottomSheetRootController>(null);

    const handleBackGroundDelete = useUploadedFileDelete({
        onSuccess: () => router.refresh(),
    });

    const handleBackGroundPick = useCallback((upload: UserUploadsEntity) => {
        form.setValue("background", upload.fileUrl);
        form.store.setPictureToSelect(upload.fileUrl);

        uploadDrawerController.current?.close();
    }, []);

    const { handleSelectFile, handleFileUpload } = useImageUploader({
        callbackUrl,
        mutationFn: uploadProfileAvatar,
        onSuccess: (upload) => {
            if (upload) handleBackGroundPick(upload);

            const { user } = session.store.toPlainObject();
            return revalidateSessionTag(user, [...GetUserUploads.queryKey, SupportedFileCollections.PROFILE_PICTURE]);
        },
    });

    return {
        handleSelectFile,
        handleFileUpload,
        handleBackGroundPick,
        handleBackGroundDelete,
        uploadDrawerController,
    };
}