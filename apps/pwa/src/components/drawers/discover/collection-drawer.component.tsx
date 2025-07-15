"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { motion, useMotionValue, useTransform } from "motion/react";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot, BottomSheetScrollable,
} from "@/components/shared/bottom-sheet";
import { Header, InterestButton, OptionsList, PreviewCard, Scroll } from "@/components/ui";
import { IconArrowLeft, IconSearch } from "@/components/icons";

import { InterestEntity } from "@/entities/interests";
import { EventEntity } from "@/entities/event";

import { DiscoverInterestsList } from "@/flows/discover/modules/interests-list";
import { DiscoverEventsList } from "@/flows/discover/modules/events-list";
import { useDiscoverContext } from "@/features/event/discover";

import styles from "./styles/collection-drawer.module.scss";

export namespace DiscoverCollectionDrawer {
    export type Data = {
        interests: InterestEntity[]
        events: EventEntity[]
    };
    export type Props = PropsWithChildren<Data> & {
        onEventInterestPick: (pointId: string | null) => void;
        onEventSlideChange: (index: number) => void;
    };
}

export const DiscoverCollectionDrawer = ({
    children,
    events,
    interests,
    onEventInterestPick,
    onEventSlideChange,
}: DiscoverCollectionDrawer.Props) => {
    const { collectionStore } = useDiscoverContext();

    const dragYProgress = useMotionValue(0);

    const transitionRange = [0, 0.4];

    const opacity1 = useTransform(dragYProgress, transitionRange, [1, 0]);
    const y1 = useTransform(dragYProgress, transitionRange, [0, 80]);
    const scale1 = useTransform(dragYProgress, transitionRange, [1, 0.97]);
    const blur1 = useTransform(dragYProgress, transitionRange, ["blur(0px)", "blur(2px)"]);

    const opacity2 = useTransform(dragYProgress, transitionRange, [0, 1]);
    const y2 = useTransform(dragYProgress, transitionRange, [50, 0]);
    const scale2 = useTransform(dragYProgress, transitionRange, [0.97, 1]);
    const blur2 = useTransform(dragYProgress, transitionRange, ["blur(2px)", "blur(0px)"]);

    const [eventSlideStartIndex] = useState(() => {
        if(collectionStore.pointToPreview) {
            const index = events.findIndex(event => event.id === collectionStore.pointToPreview?.id);
            if(index !== -1) return index;
        }

        return 0;
    });

    useEffect(() => {
        if(!collectionStore.initialLoad) {
            new Promise(resolve => setTimeout(resolve, 1800))
                .then(() => onEventSlideChange(eventSlideStartIndex));
        }
    }, [onEventSlideChange, eventSlideStartIndex]);

    return (
        <BottomSheetRoot
            defaultOpen
            touchEvents
            dismissible={false}
            snapPoints={[.95, .5, .15]}
            fadeThreshold={.6}
            defaultSnapPointIndex={2}
        >
            <BottomSheetPortal>
                <BottomSheetBody dragYProgress={dragYProgress} style={{ height: "100%" }} >
                    <div
                        className={styles.drawer__scroll}
                        style={{ position: "relative", height: 38 }}
                    >
                        <motion.div
                            style={{
                                position: "absolute",
                                y: y1,
                                opacity: opacity1,
                                scale: scale1,
                                filter: blur1,
                            }}
                        >
                            <DiscoverEventsList
                                events={events}
                                startIndex={eventSlideStartIndex}
                                onChange={onEventSlideChange}
                            />
                        </motion.div>
                        <motion.div
                            style={{
                                position: "absolute",
                                y: y2,
                                opacity: opacity2,
                                scale: scale2,
                                filter: blur2,
                            }}
                        >
                            <Scroll>
                                <InterestButton
                                    icon={<IconSearch />}
                                    layout={"icon"}
                                />
                                <DiscoverInterestsList
                                    interests={interests}
                                    onEventInterestPick={onEventInterestPick}
                                />
                            </Scroll>
                        </motion.div>
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.drawer__handle}>
                            <Header
                                size={"large"}
                                iconBefore={
                                    <Link href={"/discover"}>
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
                                    events.map((event, index) => (
                                        <Link
                                            key={event.id}
                                            href={`/discover/event/${event.id}`}
                                            onClick={() => onEventSlideChange(index)}
                                        >
                                            <PreviewCard event={event} />
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