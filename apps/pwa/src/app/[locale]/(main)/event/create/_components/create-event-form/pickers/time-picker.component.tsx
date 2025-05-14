"use client";

import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "../bottom-sheet";
import { OptionsListItem } from "@/components/shared/_redesign";
import { TimePicker } from "@/components/shared/time-picker";
import { IconClock } from "@/components/icons";
import { useCreateEventFormFieldFormatter, useCreateEventFormTimePicker } from "@/features/event/create";
import { Controller } from "react-hook-form";

import styles from "../styles.module.scss";

export namespace CreateEventFormTimePicker {
    export type Props = never;
}

export const CreateEventFormTimePicker = () => {
    return (
        <>
            <StartTime />
            <EndTime />
        </>
    );
};

const StartTime = () => {
    const {
        controlsLeft,
        controlsRight,
        resetValue,
        setDefaultValue,
    } = useCreateEventFormTimePicker("startTime");
    const formatter = useCreateEventFormFieldFormatter();
    return (
        <CreateEventFormBottomSheet handleOnly>
            <CreateEventFormBottomSheetTrigger>
                <Controller
                    name={"startTime"}
                    render={({ field }) => (
                        <OptionsListItem
                            label={"Start Time"}
                            description={formatter.formatTime(field.value)}
                            contentLeft={<IconClock />}
                            onClick={setDefaultValue}
                        />
                    )}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent
                size={"small"}
                title={"Select start time"}
                onReset={resetValue}
            >
                <div className={styles.timePicker}>
                    <TimePicker controls={controlsLeft} label={"Hr"} />
                    <TimePicker controls={controlsRight} label={"Min"} />
                </div>
            </CreateEventFormBottomSheetContent>
        </CreateEventFormBottomSheet>
    );
};

const EndTime = () => {
    const {
        controlsLeft,
        controlsRight,
        resetValue,
        setDefaultValue,
    } = useCreateEventFormTimePicker("endTime");
    const formatter = useCreateEventFormFieldFormatter();
    return (
        <CreateEventFormBottomSheet handleOnly>
            <CreateEventFormBottomSheetTrigger>
                <Controller
                    name={"endTime"}
                    render={({ field }) => (
                        <OptionsListItem
                            label={"End Time"}
                            description={formatter.formatTime(field.value)}
                            contentLeft={<IconClock />}
                            onClick={setDefaultValue}
                        />
                    )}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent
                size={"small"}
                title={"Select end time"}
                onReset={resetValue}
            >
                <div className={styles.timePicker}>
                    <TimePicker controls={controlsLeft} label={"Hr"} />
                    <TimePicker controls={controlsRight} label={"Min"} />
                </div>
            </CreateEventFormBottomSheetContent>
        </CreateEventFormBottomSheet>
    );
};
