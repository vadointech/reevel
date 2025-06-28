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
import { Link } from "@/i18n/routing";
import { DiscoverInterestsList } from "@/flows/discover/modules/interests-list";
import { useSessionContext } from "@/features/session";
import { usePersistentMap } from "@/components/shared/map";
import { useEffect } from "react";

export namespace DiscoverDrawer {
    export type Props = {
        interests: InterestEntity[];
        collections: InterestEntity[];
        cityHighlights: EventEntity[];
        controller?: BottomSheetExternalController;
        onSnapPointChange?: (snapPointIndex: number) => void;
        onEventInterestPick: (pointId: string | null) => void;
    };
}

export const DiscoverDrawer = ({
    interests,
    collections,
    cityHighlights,
    controller,
    onSnapPointChange,
    onEventInterestPick,
}: DiscoverDrawer.Props) => {
    const session = useSessionContext();
    const map = usePersistentMap();

    useEffect(() => {
        const currentState = map.provider.current.getViewState();
        const defaultState = map.provider.current.internalConfig.viewState;

        if(currentState.zoom !== defaultState.zoom) {
            map.provider.current.resetViewState();
        }
    }, []);

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
                            <Link href={"/discover/randomized"}>
                                <InterestButton
                                    icon={<IconStars />}
                                    variant={"accent"}
                                >
                                    Randomize
                                </InterestButton>
                            </Link>

                            <DiscoverInterestsList
                                interests={interests}
                                onEventInterestPick={onEventInterestPick}
                            />
                        </Scroll>
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.drawer__handle}>
                            <Input.Search placeholder={"Search"} />
                            <Avatar image={session.store.user?.profile?.picture}/>
                        </BottomSheetHandle>
                        <BottomSheetScrollable>
                            <ScrollSection
                                title={"Don’t Miss in Vinnitsa"}
                                cta={"See all"}
                                variant={"text-accent"}
                                ctaHref={"/discover/highlights"}
                                className={styles.drawer__gap}
                            >
                                {
                                    cityHighlights.map(event => (
                                        <Link
                                            key={event.id}
                                            href={`/discover/event/${event.id}`}
                                        >
                                            <EventCard
                                                size={"small"}
                                                event={event}
                                            />
                                        </Link>
                                    ))
                                }
                            </ScrollSection>

                            <ScrollSection
                                title={"Events for You"}
                                variant={"text-accent"}
                            >
                                {
                                    collections.map(interest => (
                                        <Link
                                            key={interest.slug}
                                            href={`/discover/${interest.slug}`}
                                        >
                                            <CollectionCard
                                                interest={interest}
                                                location={"Vinnitsa"}
                                            />
                                        </Link>
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
