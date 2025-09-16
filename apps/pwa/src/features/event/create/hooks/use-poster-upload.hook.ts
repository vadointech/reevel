"use client";

import { useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UploadFile } from "@/api/upload";
import { UploadEventPoster } from "@/api/event";
import { useFormContext } from "react-hook-form";
import { CreateEventFormSchemaValues } from "@/features/event/create";
import { revalidateSessionTag } from "@/features/cache";
import { useSessionContext } from "@/features/session";
import { GetUserUploads } from "@/api/user";
import { SupportedFileCollections } from "@/entities/uploads";
import { uploadEventPoster } from "@/api/event/server";

type Params = Partial<Omit<UseMutationOptions<UploadEventPoster.TOutput, unknown, UploadEventPoster.TInput>, "mutationFn">> & {
    callbackUrl?: string;
};

export function useCreateEventPosterUpload(params: Params = {}) {
    const router = useRouter();
    const session = useSessionContext();
    const form = useFormContext<CreateEventFormSchemaValues>();

    const uploadFileMutation = useMutation<UploadEventPoster.TOutput, unknown, UploadEventPoster.TInput>({
        mutationKey: UploadFile.queryKey,
        mutationFn: uploadEventPoster,
        ...params,
        onSuccess: async(data, ...args) => {
            if(data && data[0]) {
                form.setValue("poster", {
                    id: data[0].id,
                    fileUrl: data[0].fileUrl,
                });
                form.setValue("primaryColor", data[0].colorPalette[0]);
            }

            const { user } = session.store.toPlainObject();

            await revalidateSessionTag(user, [...GetUserUploads.queryKey, SupportedFileCollections.EVENT_POSTER]);
            if(params.callbackUrl) {
                router.push(params.callbackUrl);
            }

            params.onSuccess?.(data, ...args);
        },
    });

    const handleUpload = useCallback((file: Blob | null) => {
        if(file) uploadFileMutation.mutate({ file });
    }, []);

    return {
        handleUpload,
    };
}