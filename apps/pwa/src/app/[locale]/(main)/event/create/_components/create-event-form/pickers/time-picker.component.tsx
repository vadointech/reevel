"use client";

import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "../bottom-sheet";
import { OptionsListItem } from "@/components/shared/_redesign";
import { TimePicker } from "@/components/shared/time-picker";
import { IconClock } from "@/components/icons";
import {
    CreateEventFormSchemaValues,
    useCreateEventFormFieldFormatter,
    useCreateEventFormTimePicker,
} from "@/features/event/create";
import { Controller, useFormContext } from "react-hook-form";

import styles from "../styles.module.scss";

export namespace CreateEventFormTimePicker {
    export type Props = never;
}

export const CreateEventFormTimePicker = () => {
    const formatter = useCreateEventFormFieldFormatter();
    const { setValue } = useFormContext<CreateEventFormSchemaValues>();

    const setFieldValue = (field: keyof CreateEventFormSchemaValues, value?: Date) => {
        setValue(field, value, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false,
        });
    };
  
    return (
        <>
            <CreateEventFormBottomSheet handleOnly>
                <CreateEventFormBottomSheetTrigger>
                    <Controller
                        name={"startTime"}
                        render={({ field }) => (
                            <OptionsListItem
                                label={"Start Time"}
                                description={formatter.formatTime(field.value)}
                                contentLeft={<IconClock />}
                            />
                        )}
                    />
                </CreateEventFormBottomSheetTrigger>
                <CreateEventFormBottomSheetContent
                    size={"small"}
                    title={"Select start time"}
                    onReset={() => setFieldValue("startTime")}
                >
                    <StartTime />
                </CreateEventFormBottomSheetContent>
            </CreateEventFormBottomSheet>
            <CreateEventFormBottomSheet handleOnly>
                <CreateEventFormBottomSheetTrigger>
                    <Controller
                        name={"endTime"}
                        render={({ field }) => (
                            <OptionsListItem
                                label={"End Time"}
                                description={formatter.formatTime(field.value)}
                                contentLeft={<IconClock />}
                            />
                        )}
                    />
                </CreateEventFormBottomSheetTrigger>
                <CreateEventFormBottomSheetContent
                    size={"small"}
                    title={"Select end time"}
                    onReset={() => setFieldValue("endTime")}
                >
                    <EndTime />
                </CreateEventFormBottomSheetContent>
            </CreateEventFormBottomSheet>
        </>
    );
};

const StartTime = () => {
    const {
        controlsLeft,
        controlsRight,
    } = useCreateEventFormTimePicker("startTime");
    return (
        <div className={styles.timePicker}>
            <TimePicker controls={controlsLeft} label={"Hr"} />
            <TimePicker controls={controlsRight} label={"Min"} />
        </div>
    );
};

const EndTime = () => {
    const {
        controlsLeft,
        controlsRight,
    } = useCreateEventFormTimePicker("endTime");
    return (
        <div className={styles.timePicker}>
            <TimePicker controls={controlsLeft} label={"Hr"} />
            <TimePicker controls={controlsRight} label={"Min"} />
        </div>
    );
};
