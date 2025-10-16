import { useCallback, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    DeleteUploadedFileMutation,
    GetCurrentUserUploadsQuery,
    UploadAvatarMutation,
} from "@/features/profile/queries";

import { useFileSelect } from "@/features/uploader/hooks";
import { useImageUploaderContext } from "@/features/uploader/image";

import { useEditProfileFormContext } from "../edit-profile-form.context";

import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";
import { SupportedFileCollections, UserUploadsEntity } from "@/entities/uploads";

export function useProfileAvatarUploader(callbackUrl?: string) {
    const router = useRouter();
    const form = useEditProfileFormContext();
    const imageUploader = useImageUploaderContext();
    const queryClient = useQueryClient();

    const uploadDrawerController = useRef<IBottomSheetRootController>(null);

    const handleSelectFile = useFileSelect({
        onFileSelected: (src) => {
            imageUploader.controller.setImageSrc(src);
            if(callbackUrl) router.push(callbackUrl);
        },
    });

    const deleteAvatarMutation = useMutation({
        ...DeleteUploadedFileMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: GetCurrentUserUploadsQuery.queryKey([SupportedFileCollections.PROFILE_PICTURE]),
            });
        },
    });
    const handleDeleteAvatar = useCallback((upload: UserUploadsEntity) => {
        deleteAvatarMutation.mutate({ fileId: upload.id });
    }, []);

    const uploadAvatarMutation = useMutation({
        ...UploadAvatarMutation,
        onSuccess: (upload) => {
            queryClient.invalidateQueries({
                queryKey: GetCurrentUserUploadsQuery.queryKey([SupportedFileCollections.PROFILE_PICTURE]),
            });
            if(upload) handlePickAvatar(upload);
            if(callbackUrl) router.replace(callbackUrl);
        },
    });
    const handleCropAvatar = useCallback(() => {
        imageUploader.controller.cropImage().then(uploadAvatarMutation.mutate);
    }, []);

    const handlePickAvatar = useCallback((upload: UserUploadsEntity) => {
        form.setValue("avatar", upload.fileUrl);
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