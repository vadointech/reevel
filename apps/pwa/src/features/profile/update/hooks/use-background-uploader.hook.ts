import { useCallback, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";

import { uploadProfileAvatar } from "@/api/profile/server";
import { deleteUploadedFile } from "@/api/user/uploads/server";

import { useFileSelect } from "@/features/uploader/hooks";
import { useImageUploaderContext } from "@/features/uploader/image";

import { useEditProfileFormContext } from "../edit-profile-form.context";

import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";
import { UserUploadsEntity } from "@/entities/uploads";

export function useProfileBackgroundUploader(callbackUrl?: string) {
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

    const deleteBackgroundMutation = useMutation({
        mutationFn: deleteUploadedFile,
        onSuccess: () => {
            router.refresh();
        },
    });
    const handleDeleteBackground = useCallback((upload: UserUploadsEntity) => {
        deleteBackgroundMutation.mutate({ fileId: upload.id });
    }, []);

    const uploadBackgroundMutation = useMutation({
        mutationFn: uploadProfileAvatar,
        onSuccess: (upload) => {
            if (upload) handlePickBackground(upload);
            if (callbackUrl) router.replace(callbackUrl);
        },
    });
    const handleCropBackground = useCallback(() => {
        imageUploader.controller.cropImage().then(uploadBackgroundMutation.mutate);
    }, []);

    const handlePickBackground = useCallback((upload: UserUploadsEntity) => {
        form.setValue("background", upload.fileUrl);
        form.store.setPictureToSelect(upload.fileUrl);

        uploadDrawerController.current?.close();
    }, []);

    return {
        handleSelectFile,
        handlePickBackground,
        handleCropBackground,
        handleDeleteBackground,
        uploadDrawerController,

        isDeleting: deleteBackgroundMutation.isPending,
        isUploading: uploadBackgroundMutation.isPending,
    };
}