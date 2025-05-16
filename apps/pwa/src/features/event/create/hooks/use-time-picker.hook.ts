"use client";

import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useTimePicker } from "@/components/shared/time-picker";
import { CreateEventFormSchemaValues } from "@/features/event/create";

const HOURS_OFFSET = 1;

type TimeField = "startTime" | "endTime" | "endDate";

export function useCreateEventFormTimePicker(field: TimeField) {
    const {
        defaultValue,
        valueConstraints,
    } = getFieldConstraints(field);

    const { getValues, setValue } = useFormContext<CreateEventFormSchemaValues>();

    const startIndex = defaultValue.getHours() - valueConstraints.getHours();
    const fieldValue = useRef<Date | undefined>(defaultValue);

    const resetFieldValue = () => fieldValue.current = undefined;

    const setFieldValue = (field: TimeField, value?: Date) => {
        setValue(field, value);
    };
    
    useEffect(() => {
        return () => {
            setFieldValue(field, fieldValue.current);

            if(field === "startTime") {
                if(fieldValue.current) {
                    const endTime = getValues("endTime");
                    if(endTime && endTime.getHours() < fieldValue.current.getHours()) {
                        setFieldValue("endTime", undefined);
                        setFieldValue("endDate", undefined);
                    }
                }
            }

            if(field === "endTime") {
                setFieldValue("endDate", fieldValue.current);
            }
        };
    }, []);

    const controlsLeft = useTimePicker({
        startIndex,
        slideCount: 24,
        slidesFrom: valueConstraints.getHours(),
        handlers: {
            onChange: (carousel) => {
                const hours = carousel.api.selectedScrollSnap() + valueConstraints.getHours();

                fieldValue.current?.setHours(hours);
            },
        },
    });

    const controlsRight = useTimePicker({
        slideCount: 60,
        slidesFrom: valueConstraints.getMinutes(),
        startIndex: defaultValue.getMinutes(),
        handlers: {
            onChange: (carousel) => {
                const minutes = carousel.api.selectedScrollSnap() + valueConstraints.getMinutes();

                fieldValue.current?.setMinutes(minutes);
            },
        },
    });

    return {
        controlsLeft,
        controlsRight,
        resetFieldValue,
    };
}

function getFieldConstraints(field: TimeField) {
    const { getValues } = useFormContext<CreateEventFormSchemaValues>();

    const now = new Date();
    const startTime = getValues("startTime");

    let valueConstraints: Date;

    if(field === "startTime") {
        valueConstraints = new Date(
            getValues("startDate"),
        );
        if(valueConstraints.getDate() === now.getDate()) {
            valueConstraints.setHours(
                now.getHours() + HOURS_OFFSET,
                0, 0, 0,
            );
        }
    } else {
        if(startTime) {
            valueConstraints = new Date(startTime);
        } else {
            valueConstraints = new Date(now);
        }
        valueConstraints.setHours(
            valueConstraints.getHours() + HOURS_OFFSET,
            0, 0, 0,
        );
    }

    const defaultValue = getValues(field) || valueConstraints;

    return {
        defaultValue,
        valueConstraints,
    };
}