"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { useMotionValue } from "motion/react";

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

import { EventEntity } from "@/entities/event";

import styles from "./styles.module.scss";

export namespace CalendarMapViewDrawer {
    export type Data = {
        upcomingEvents: EventEntity[];
        hostingEvents: EventEntity[];
        attendingEvents: EventEntity[];
    };
    export type Props = PropsWithChildren<Data>;
}

export const CalendarMapViewDrawer = ({
    children,
    upcomingEvents,
    hostingEvents,
    attendingEvents,
}: CalendarMapViewDrawer.Props) => {
    const dragYProgress = useMotionValue(0);

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
                <BottomSheetBody dragYProgress={dragYProgress} style={{ height: "100%" }} >
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

                            {
                                upcomingEvents.length > 0 && (
                                    <InterestButton>
                                        Upcoming • { upcomingEvents.length }
                                    </InterestButton>
                                )
                            }

                            {
                                hostingEvents.length > 0 && (

                                    <InterestButton>
                                        Hosting • { hostingEvents.length }
                                    </InterestButton>
                                )
                            }

                            {
                                attendingEvents.length > 0 && (
                                    <InterestButton>
                                        Attending • { attendingEvents.length }
                                    </InterestButton>
                                )
                            }
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
                                    upcomingEvents.map(event => (
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
