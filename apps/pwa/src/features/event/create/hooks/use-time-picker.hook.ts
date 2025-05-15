"use client";

import { useFormContext } from "react-hook-form";
import { useTimePicker } from "@/components/shared/time-picker";
import { CreateEventFormSchemaValues } from "../validation/create-event-form.schema";

export function useCreateEventFormTimePicker(field: "startTime" | "endTime") {
    const { getValues, setValue } = useFormContext<CreateEventFormSchemaValues>();

    const fieldValue = getValues("startDate");

    const defaultDate = new Date(fieldValue);

    const setFieldValue = (value?: Date) => {
        setValue(field, value, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false,
        });
    };

    const setDefaultValue = () => {
        setFieldValue(defaultDate);
    };

    const resetValue = () => setFieldValue(undefined);

    const controlsLeft = useTimePicker({
        slideCount: 24,
        itemSize: 50,
        itemsInView: 2,
        itemCount: 10,
        loop: true,
        perspective: "left",
        startIndex: defaultDate.getHours(),
        handlers: {
            onChange: (carousel) => {
                const date = new Date(fieldValue);
                const hours = carousel.api.selectedScrollSnap();
                const minutes = date.getMinutes();
                date.setHours(hours, minutes, 0, 0);
                setFieldValue(date);
            },
        },
    });

    const controlsRight = useTimePicker({
        slideCount: 60,
        itemSize: 50,
        itemsInView: 3,
        itemCount: 10,
        loop: true,
        perspective: "left",
        startIndex: defaultDate.getMinutes(),
        handlers: {
            onChange: (carousel) => {
                const date = new Date(fieldValue);
                const hours = date.getHours();
                const minutes = carousel.api.selectedScrollSnap();
                date.setHours(hours, minutes, 0, 0);
                setFieldValue(date);
            },
        },
    });

    return {
        controlsLeft,
        controlsRight,
        resetValue,
        setDefaultValue,
    };
}