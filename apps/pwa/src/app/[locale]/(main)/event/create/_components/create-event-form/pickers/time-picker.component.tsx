"use client";

import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "../bottom-sheet";
import { Input, OptionsListItem } from "@/components/shared/_redesign";
import { TimePicker, useTimePicker } from "@/components/shared/time-picker";
import { IconClock, IconDollar } from "@/components/icons";

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
    const controlsLeft = useTimePicker({
        slideCount: 24,
        itemSize: 50,
        itemsInView: 2,
        itemCount: 10,
        loop: true,
        perspective: "left",
    });

    const controlsRight = useTimePicker({
        slideCount: 60,
        itemSize: 50,
        itemsInView: 3,
        itemCount: 10,
        loop: true,
        perspective: "left",
    });
    return (
        <CreateEventFormBottomSheet handleOnly>
            <CreateEventFormBottomSheetTrigger>
                <OptionsListItem
                    label={"Start Time"}
                    description={"All day"}
                    contentLeft={<IconClock />}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent size={"small"} title={"Select start time"}>
                <div className={styles.timePicker}>
                    <TimePicker controls={controlsLeft} label={"Hr"} />
                    <TimePicker controls={controlsRight} label={"Min"} />
                </div>
            </CreateEventFormBottomSheetContent>
        </CreateEventFormBottomSheet>
    );
};

const EndTime = () => {

    const controlsLeft = useTimePicker({
        slideCount: 24,
        itemSize: 50,
        itemsInView: 2,
        itemCount: 10,
        loop: true,
        perspective: "left",
    });

    const controlsRight = useTimePicker({
        slideCount: 60,
        itemSize: 50,
        itemsInView: 3,
        itemCount: 10,
        loop: true,
        perspective: "left",
    });

    return (
        <CreateEventFormBottomSheet handleOnly>
            <CreateEventFormBottomSheetTrigger>
                <OptionsListItem
                    label={"End Time"}
                    description={"All day"}
                    contentLeft={<IconClock />}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent size={"small"} title={"Select end time"}>
                <div className={styles.timePicker}>
                    <TimePicker controls={controlsLeft} label={"Hr"} />
                    <TimePicker controls={controlsRight} label={"Min"} />
                </div>
            </CreateEventFormBottomSheetContent>
        </CreateEventFormBottomSheet>
    );
};
