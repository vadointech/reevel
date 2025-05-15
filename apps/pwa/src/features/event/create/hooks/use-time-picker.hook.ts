"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTimePicker } from "@/components/shared/time-picker";
import { CreateEventFormSchemaValues } from "@/features/event/create";

const HOURS_OFFSET = 1;

type TimeField = "startTime" | "endTime";

export function useCreateEventFormTimePicker(field: TimeField) {

    const { getValues, setValue } = useFormContext<CreateEventFormSchemaValues>();

    const now = new Date();
    const startDate = getValues("startDate");
    const startTime = getValues("startTime");

    const defaultValue = useMemo<Date>(() => {
        let date: Date;
        if(startTime) {
            date = new Date(startTime);
        } else {
            date = new Date(startDate);
            date.setHours(now.getHours(), now.getMinutes(), 0, 0);
        }
        return date;
    }, []);

    const bounds = useMemo<{ hours: number, minutes: number }>(() => {
        if(defaultValue.getDate() === now.getDate()) {
            return {
                hours: now.getHours() + HOURS_OFFSET,
                minutes: now.getMinutes(),
            };
        }

        return { hours: 0, minutes: 0 };
    }, [defaultValue]);

    const setFieldValue = (value?: Date) => {
        setValue(field, value, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false,
        });
    };

    const controlsLeft = useTimePicker({
        slideCount: 24,
        slidesFrom: bounds.hours,
        startIndex: (defaultValue.getHours() - bounds.hours) + (field === "endTime" ? 1 : 0),
        handlers: {
            onChange: (carousel) => {
                const hours = carousel.api.selectedScrollSnap() + bounds.hours;

                const updatedDate = new Date(defaultValue);
                const minutes = updatedDate.getMinutes();
                updatedDate.setHours(hours, minutes, 0, 0);
                setFieldValue(updatedDate);
            },
        },
    });

    const controlsRight = useTimePicker({
        slideCount: 60,
        startIndex: defaultValue.getMinutes(),
        handlers: {
            onChange: (carousel) => {
                const minutes = carousel.api.selectedScrollSnap();

                const updatedDate = new Date(defaultValue);
                const hours = updatedDate.getHours();
                updatedDate.setHours(hours, minutes, 0, 0);
                setFieldValue(updatedDate);
            },
        },
    });

    return {
        controlsLeft,
        controlsRight,
    };
}