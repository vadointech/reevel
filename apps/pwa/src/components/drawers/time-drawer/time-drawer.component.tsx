"use client"

import { ComponentProps } from "react"
import styles from "./styles.module.scss"
import cx from "classnames"
import { useEventStore } from "@/features/event";
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { TimePicker } from "@/components/shared/time-picker";
import EventTimePicker from "@/app/[locale]/(main)/event/date/_components/time-carousel/time-carousel.component";
import { Button } from "@/components/ui/button";

export type Variant = "start" | 'and'

export namespace TimeDrawer {
    export type Props = ComponentProps<"div"> & {
        variant: Variant;
        open?: boolean;
        onClose?: () => void;
    }
}


export const TimeDrawer = ({
    open,
    onClose,
    variant
}: TimeDrawer.Props) => {
    const eventStore = useEventStore()

    const handleStartHour = (hour: string) => { eventStore.dateStore.setStartHour(hour) }
    const handleEndHour = (hour: string) => { eventStore.dateStore.setEndHour(hour) }

    const handleStartMinute = (minute: string) => { eventStore.dateStore.setStartMinute(minute) }
    const handleEndMinute = (minute: string) => { eventStore.dateStore.setEndMinute(minute) }


    return (
        <Drawer open={open} staticPoint={"middle"}>
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <h2>Select start time</h2>
                    <EventTimePicker onHourChange={variant == "start" ? handleStartHour : handleEndHour} onMinuteChange={variant == "start" ? handleStartMinute : handleEndMinute} />
                    <Button
                        variant="primary"
                        onClick={onClose}
                    >
                        Confirm
                    </Button>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
}