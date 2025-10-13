"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { EventVisibility } from "@/entities/event";
import { useMutation } from "@tanstack/react-query";
import { CreateEvent } from "@/api/event/create";
import { useFormContext } from "react-hook-form";
import { createEventFormSchema, CreateEventFormSchemaValues } from "@/features/event/create";
import { indexedDbService } from "@/lib/indexed-db.service";
import { useSessionContext } from "@/features/session";
import { UserUploadsEntity } from "@/entities/uploads";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";
import { FetcherErrorResponse } from "@/lib/fetcher/types";
import { createEvent } from "@/api/event/server";
import { useFileSelect, useUploadedFileDelete } from "@/features/uploader/hooks";
import { StaticRoutes } from "@/config/routes.config";
import { useImageUploaderContext } from "@/features/uploader/image";

type Params = {
    callbackUrl: string;
    cropperPageUrl?: string;
};

export function useCreateEventPreview(params: Params) {
    const form = useFormContext<CreateEventFormSchemaValues>();
    const router = useRouter();
    const session = useSessionContext();
    const imageUploader = useImageUploaderContext();
    
    const uploadDrawerController = useRef<IBottomSheetRootController>(null);

    const handleSelectFile = useFileSelect({
        onFileSelected: (src) => {
            imageUploader.controller.setImageSrc(src);
            if(params.cropperPageUrl) router.push(params.cropperPageUrl);
        },
    });

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
                        router.push(params.callbackUrl);
                    }
                });
        }
    }, []);

    const createEventMutation = useMutation<CreateEvent.TOutput, FetcherErrorResponse, CreateEvent.TInput>({
        mutationKey: CreateEvent.queryKey,
        mutationFn: createEvent,
        onSuccess: () => {
            indexedDbService.removeItem("event_form_values");
            router.push(StaticRoutes.Discover);
        },
    });
  
    const handlePublishEvent = useCallback(async() => {
        if(!formValues) return;

        const interests = formValues.interests.map(item => item.slug);
        const visibility = formValues.visibility as EventVisibility;

        const startDate = new Date(formValues.startDate);

        if(formValues.startTime) {
            const startTime = new Date(formValues.startTime);
            startDate.setHours(
                startTime.getHours(),
                startTime.getMinutes(),
            );
        }

        let endDate: Date | undefined = undefined;
        if(formValues.endDate) {
            endDate = new Date(formValues.endDate);
        }
        if(formValues.endTime) {
            const endTime = new Date(formValues.endTime);
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
            ...formValues,
            poster: formValues.poster.fileUrl,
            posterFieldId: formValues.poster.id,
            visibility,
            locationPoint: formValues.location.geometry.coordinates,
            locationTitle: formValues.location.properties.label,
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

    const handlePosterDelete = useUploadedFileDelete({
        onSuccess: () => {
            router.refresh();
        },
    });

    return {
        session,
        formValues,
        handleSelectFile,
        handlePosterPick,
        handlePosterDelete,
        handlePublishEvent,
        handlePosterPrimaryColorChange,

        isPublishing: createEventMutation.isPending,

        uploadDrawerController,
    };
}