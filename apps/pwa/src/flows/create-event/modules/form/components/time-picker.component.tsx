"use client";

import {
    CreateEventFormBottomSheet, CreateEventFormBottomSheetBody,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "./bottom-sheet.component";
import { OptionsListItem } from "@/components/shared/_redesign";
import { TimePicker } from "@/components/shared/time-picker";
import { IconClock } from "@/components/icons";
import {
    useCreateEventFormFieldFormatter,
    useCreateEventFormTimePicker,
} from "@/features/event/create";
import { Controller } from "react-hook-form";

import styles from "../styles/time-picker.module.scss";

export namespace CreateEventFormTimePicker {
    export type Props = never;
}

export const CreateEventFormTimePicker = () => {
    const formatter = useCreateEventFormFieldFormatter();
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
                <CreateEventFormBottomSheetBody>
                    <StartTime />
                </CreateEventFormBottomSheetBody>
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
                <CreateEventFormBottomSheetBody>
                    <EndTime />
                </CreateEventFormBottomSheetBody>
            </CreateEventFormBottomSheet>
        </>
    );
};

const StartTime = () => {
    const {
        controlsLeft,
        controlsRight,
        resetFieldValue,
    } = useCreateEventFormTimePicker("startTime");
    return (
        <CreateEventFormBottomSheetContent
            size={"small"}
            title={"Select start time"}
            onReset={resetFieldValue}
        >
            <div className={styles.timePicker}>
                <TimePicker controls={controlsLeft} label={"Hr"} />
                <TimePicker controls={controlsRight} label={"Min"} />
            </div>
        </CreateEventFormBottomSheetContent>
    );
};

const EndTime = () => {
    const {
        controlsLeft,
        controlsRight,
        resetFieldValue,
    } = useCreateEventFormTimePicker("endTime");
    return (
        <CreateEventFormBottomSheetContent
            size={"small"}
            title={"Select end time"}
            onReset={resetFieldValue}
        >
            <div className={styles.timePicker}>
                <TimePicker controls={controlsLeft} label={"Hr"} />
                <TimePicker controls={controlsRight} label={"Min"} />
            </div>
        </CreateEventFormBottomSheetContent>
    );
};
