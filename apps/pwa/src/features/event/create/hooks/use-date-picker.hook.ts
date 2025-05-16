"use client";

import { useFormContext } from "react-hook-form";
import { CreateEventFormSchemaValues, useCreateEventFormFieldFormatter } from "@/features/event/create";

export function useCreateEventFormDatePicker() {
    const formatter = useCreateEventFormFieldFormatter();

    const { setValue } = useFormContext<CreateEventFormSchemaValues>();

    const setFieldValue = (field: keyof CreateEventFormSchemaValues, value?: Date) => {
        setValue(field, value, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false,
        });
    };

    const handleChange = (value?: Date) => {
        setFieldValue("startDate", value);
        setFieldValue("startTime");
        setFieldValue("endDate");
        setFieldValue("endTime");
    };

    const getDescription = (startDate: any, endDate: any) => {
        if(startDate instanceof Date && endDate instanceof Date) {
            if(startDate.getDate() < endDate.getDate()) {
                return formatter.formatDate(startDate) + ` - ${formatter.formatDate(endDate)}`;
            }
        }
        return formatter.formatDate(startDate);
    };

    return {
        handleChange,
        getDescription,
    };
}