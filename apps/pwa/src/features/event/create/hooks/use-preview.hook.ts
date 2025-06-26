"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { EventVisibility } from "@/entities/event";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createEvent, CreateEvent } from "@/api/event/create";
import { useFormContext } from "react-hook-form";
import { createEventFormSchema, CreateEventFormSchemaValues } from "@/features/event/create";
import { indexedDbService } from "@/lib/indexed-db.service";
import { useSessionContext } from "@/features/session";
import { SupportedFileCollections, UserUploadsEntity } from "@/entities/uploads";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";
import { DeleteUploadedFile, deleteUploadedFile, GetUserUploads } from "@/api/user/uploads";
import { FetcherError } from "@/lib/fetcher/error";
import { revalidateSessionTag } from "@/features/cache";

type Params = Partial<Omit<UseMutationOptions<CreateEvent.TOutput, unknown, CreateEvent.TInput>, "mutationFn">> & {
    callbackUrl?: string;
};

export function useCreateEventPreview(params: Params = {}) {
    const form = useFormContext<CreateEventFormSchemaValues>();
    const router = useRouter();
    const session = useSessionContext();
    
    const uploadDrawerController = useRef<IBottomSheetRootController>(null);

    const [formValues, setFormValues] = useState<CreateEventFormSchemaValues | undefined>(() => {
        const formValues = form.getValues();
        const validatedFormValues = createEventFormSchema.safeParse(formValues);
        if(validatedFormValues.success) return formValues;
    });

    useEffect(() => {
        const validatedFormValues = createEventFormSchema.safeParse(formValues);
        if(!validatedFormValues.success) {
            indexedDbService.getItem<CreateEventFormSchemaValues>("event_form_values")
                .then(data => {
                    if(data) {
                        setFormValues(data);
                    } else {
                        router.push(params.callbackUrl || "/");
                    }
                });
        }
    }, []);

    const createEventMutation = useMutation<CreateEvent.TOutput, FetcherError, CreateEvent.TInput>({
        mutationKey: CreateEvent.queryKey,
        mutationFn: (body) => createEvent({ body })
            .then(response => response.data),
        ...params,
        onSuccess: (...args) => {
            indexedDbService.removeItem("event_form_values");
            router.push("/");
            params.onSuccess?.(...args);
        },
    });
  
    const handlePublishEvent = useCallback(async() => {
        if(!formValues) return;
        const { success, data } = createEventFormSchema.safeParse(formValues);
        if(!success || !data) return;

        const interests = data.interests.map(item => item.slug);
        const visibility = data.visibility as EventVisibility;

        const startDate = new Date(data.startDate);

        if(data.startTime) {
            const startTime = new Date(data.startTime);
            startDate.setHours(
                startTime.getHours(),
                startTime.getMinutes(),
            );
        }

        let endDate: Date | undefined = undefined;
        if(data.endDate) {
            endDate = new Date(data.endDate);
        }
        if(data.endTime) {
            const endTime = new Date(data.endTime);
            if(endDate) {
                endDate.setHours(
                    endTime.getHours(),
                    endTime.getMinutes(),
                );
            } else {
                endDate = endTime;
            }
        }

        createEventMutation.mutate({
            ...data,
            poster: data.poster.fileUrl,
            posterFieldId: data.poster.id,
            visibility,
            locationPoint: data.location.geometry.coordinates,
            locationTitle: data.location.properties.label,
            interests,
            startDate,
            endDate,
        });
    }, [formValues]);

    const handlePosterPick = useCallback((upload: UserUploadsEntity) => {
        form.setValue("poster", {
            id: upload.id,
            fileUrl: upload.fileUrl,
        });
        form.setValue("primaryColor", upload.colorPalette[0]);

        uploadDrawerController.current?.close();

        if(formValues) {
            setFormValues({
                ...formValues,
                poster: {
                    id: upload.id,
                    fileUrl: upload.fileUrl,
                },
                primaryColor: upload.colorPalette[0],
            });
        }
    }, [formValues]);

    const handlePosterPrimaryColorChange = useCallback((color: string) => {
        if(color === formValues?.primaryColor) return;

        form.setValue("primaryColor", color);
        if(formValues) {
            setFormValues({
                ...formValues,
                primaryColor: color,
            });
        }
    }, [formValues]);

    const deleteUploadedFileMutation = useMutation<DeleteUploadedFile.TOutput, FetcherError, DeleteUploadedFile.TInput>({
        mutationFn: (body) => deleteUploadedFile({ body })
            .then(response => response.data),
        onSuccess: () => {
            const { user } = session.store.toPlainObject();
            revalidateSessionTag(user, [...GetUserUploads.queryKey, SupportedFileCollections.EVENT_POSTER]);
        },
    });

    const handlePosterDelete = useCallback((upload: UserUploadsEntity) => {
        if(formValues?.poster?.id === upload.id) {
            // TODO: Set to default
        }

        deleteUploadedFileMutation.mutateAsync({ fileId: upload.id });
    }, [formValues]);

    return {
        session,
        formValues,
        handlePosterPick,
        handlePosterDelete,
        handlePublishEvent,
        handlePosterPrimaryColorChange,

        uploadDrawerController,
    };
}