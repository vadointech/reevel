"use client";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetScrollable,
} from "@/components/shared/bottom-sheet";

import { Avatar, CollectionCard, EventCard, Input, InterestButton, Scroll } from "@/components/ui";
import { IconStars } from "@/components/icons";
import { ScrollSection } from "@/components/sections";
import { BottomSheetExternalController } from "@/components/shared/bottom-sheet/types";

import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";

import styles from "./styles/discover-drawer.module.scss";

export namespace DiscoverDrawer {
    export type Props = {
        interests: InterestEntity[];
        collections: InterestEntity[];
        cityHighlights: EventEntity[];
        controller?: BottomSheetExternalController;
        onSnapPointChange?: (snapPointIndex: number) => void;
    };
}

export const DiscoverDrawer = ({
    interests,
    collections,
    cityHighlights,
    controller,
    onSnapPointChange,
}: DiscoverDrawer.Props) => {

    return (
        <BottomSheetRoot
            defaultOpen
            touchEvents
            dismissible={false}
            snapPoints={[.95, .5, .18]}
            fadeThreshold={.6}
            defaultSnapPointIndex={1}
            externalController={controller}
            onSnapPointChange={onSnapPointChange}
        >
            <BottomSheetPortal>
                <BottomSheetBody style={{ height: "100%" }}>
                    <div className={styles.drawer__scroll}>
                        <Scroll>
                            <InterestButton
                                icon={<IconStars />}
                                variant={"accent"}
                            >
                                Randomize
                            </InterestButton>
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
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.drawer__handle}>
                            <Input.Search placeholder={"Search"} />
                            <Avatar image={"/assets/temp/avatar.png"}/>
                        </BottomSheetHandle>
                        <BottomSheetScrollable>
                            <ScrollSection
                                title={"Don’t Miss in Vinnitsa"}
                                cta={"See all"}
                                variant={"text-accent"}
                                ctaHref={"/discover/rnd"}
                                className={styles.drawer__gap}
                            >
                                {
                                    cityHighlights.map(event => (
                                        <EventCard
                                            size={"small"}
                                            event={event}
                                        />
                                    ))
                                }
                            </ScrollSection>

                            <ScrollSection
                                title={"Events for You"}
                                cta={"See all"}
                                variant={"text-accent"}
                            >
                                {
                                    collections.map(interest => (
                                        <CollectionCard
                                            interest={interest}
                                            location={"Vinnitsa"}
                                        />
                                    ))
                                }
                            </ScrollSection>
                        </BottomSheetScrollable>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
