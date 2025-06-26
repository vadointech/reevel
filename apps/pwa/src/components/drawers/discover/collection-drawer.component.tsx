"use client";

import { PropsWithChildren } from "react";
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
import { RecommendationCard } from "@/components/ui/cards";

import { InterestEntity } from "@/entities/interests";
import { EventEntity } from "@/entities/event";

import styles from "./styles/collection-drawer.module.scss";

export namespace DiscoverCollectionDrawer {
    export type Data = {
        interests: InterestEntity[]
        events: EventEntity[]
    };
    export type Props = PropsWithChildren<Data>;
}

export const DiscoverCollectionDrawer = ({
    events,
    interests,
    children,
}: DiscoverCollectionDrawer.Props) => {
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
                            <Scroll dragFree={false}>
                                {
                                    events.map(event => (
                                        <RecommendationCard
                                            key={event.id}
                                            event={event}
                                        />
                                    ))
                                }
                            </Scroll>
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
                                {
                                    interests.map(item => (
                                        <InterestButton
                                            key={item.slug}
                                            icon={item.icon}
                                            variant={"default"}
                                        >
                                            { item.title_uk }
                                        </InterestButton>
                                    ))
                                }
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
                                    events.map(event => (
                                        <PreviewCard
                                            key={event.id}
                                            event={event}
                                        />
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