"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetScrollable,
} from "@/components/shared/bottom-sheet";

import { Carousel } from "@/components/shared/carousel";
import { EventListItemCard, Header, InterestButton, OptionsList } from "@/components/ui";
import { IconArrowLeft, IconSearch } from "@/components/icons";

import { EventEntity, EventParticipationType } from "@/entities/event";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { useCalendarContext } from "@/features/calendar";

export namespace CalendarMapViewDrawer {
    export type Data = {
        hostingEvents: EventEntity[];
        attendingEvents: EventEntity[];
    };
    export type Props = PropsWithChildren<Data> & {
        handleSelectParticipationType: (type: EventParticipationType | null) => void;
    };

    export type ParticipationTypeButtonProps = PropsWithChildren<{
        type: EventParticipationType | null;
        events: EventEntity[];
        onChange: (type: EventParticipationType | null) => void;
    }>;
}

export const CalendarMapViewDrawer = ({
    children,
    hostingEvents,
    attendingEvents,
    handleSelectParticipationType,
}: CalendarMapViewDrawer.Props) => {
    return (
        <BottomSheetRoot
            defaultOpen
            touchEvents
            dismissible={false}
            snapPoints={[.95, .5, .18]}
            fadeThreshold={.6}
            defaultSnapPointIndex={2}
        >
            <BottomSheetPortal>
                <BottomSheetBody style={{ height: "100%" }} >
                    <div
                        className={styles.drawer__scroll}
                        style={{ position: "relative", height: 38 }}
                    >
                        <Carousel>
                            <Link href={"/calendar/search"}>
                                <InterestButton
                                    icon={<IconSearch />}
                                    layout={"icon"}
                                />
                            </Link>

                            <ParticipationTypeButton
                                type={EventParticipationType.HOSTING}
                                events={hostingEvents}
                                onChange={handleSelectParticipationType}
                            >
                                Hosting
                            </ParticipationTypeButton>

                            <ParticipationTypeButton
                                type={EventParticipationType.ATTENDING}
                                events={attendingEvents}
                                onChange={handleSelectParticipationType}
                            >
                                Attending
                            </ParticipationTypeButton>
                        </Carousel>
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.drawer__handle}>
                            <Header
                                size={"large"}
                                iconBefore={
                                    <Link href={"/calendar"}>
                                        <IconArrowLeft />
                                    </Link>
                                }
                            >
                                { children }
                            </Header>
                        </BottomSheetHandle>
                        <BottomSheetScrollable className={styles.drawer__list}>
                            <OptionsList>
                                {
                                    hostingEvents.map(event => (
                                        <Link
                                            key={event.id}
                                            href={`/discover/event/${event.id}`}
                                        >
                                            <EventListItemCard event={event} />
                                        </Link>
                                    ))
                                }
                            </OptionsList>
                        </BottomSheetScrollable>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};

const ParticipationTypeButton = observer(({
    type,
    events,
    children,
    onChange,
}: CalendarMapViewDrawer.ParticipationTypeButtonProps) => {
    const calendar = useCalendarContext();

    return (
        <InterestButton
            variant={
                calendar.store.participationType === type ? "primary" : "default"
            }
            onClick={() => onChange(type)}
        >
            { children } • { events.length }
        </InterestButton>
    );
});
