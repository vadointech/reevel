import { useCallback, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { UserUploadsEntity } from "@/entities/uploads";
import { uploadProfileAvatar } from "@/api/profile/server";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";

import { useMutation } from "@tanstack/react-query";
import { useImageUploaderContext } from "@/features/uploader/image";
import { deleteUploadedFile } from "@/api/user/uploads/server";
import { useFileSelect } from "@/features/uploader/hooks";
import { useEditProfileFormContext } from "../edit-profile-form.context";

export function useEditProfileBackGroundUploader(callbackUrl?: string) {
    const router = useRouter();
    const form = useEditProfileFormContext();
    const imageUploader = useImageUploaderContext();

    const uploadDrawerController = useRef<IBottomSheetRootController>(null);

    const handleSelectFile = useFileSelect({
        onFileSelected: (src) => {
            imageUploader.controller.setImageSrc(src);
            if (callbackUrl) router.push(callbackUrl);
        },
    });

    const deleteAvatarMutation = useMutation({
        mutationFn: deleteUploadedFile,
        onSuccess: () => {
            router.refresh();
        },
    });
    const handleDeleteAvatar = useCallback((upload: UserUploadsEntity) => {
        deleteAvatarMutation.mutate({ fileId: upload.id });
    }, []);

    const uploadAvatarMutation = useMutation({
        mutationFn: uploadProfileAvatar,
        onSuccess: (upload) => {
            if (upload) handlePickAvatar(upload);
            if (callbackUrl) router.replace(callbackUrl);
        },
    });
    const handleCropAvatar = useCallback(() => {
        imageUploader.controller.cropImage().then(uploadAvatarMutation.mutate);
    }, []);

    const handlePickAvatar = useCallback((upload: UserUploadsEntity) => {
        form.setValue("background", upload.fileUrl);
        form.store.setPictureToSelect(upload.fileUrl);

        uploadDrawerController.current?.close();
    }, []);

    return {
        handleSelectFile,
        handlePickAvatar,
        handleCropAvatar,
        handleDeleteAvatar,
        uploadDrawerController,

        isDeleting: deleteAvatarMutation.isPending,
        isUploading: uploadAvatarMutation.isPending,
    };
}