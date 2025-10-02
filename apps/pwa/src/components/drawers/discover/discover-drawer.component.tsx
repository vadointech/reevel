"use client";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot, BottomSheetScrollable,
} from "@/components/shared/bottom-sheet";

import { Avatar, CollectionCard, EventCard, Input, InterestButton, Scroll } from "@/components/ui";
import { IconStars } from "@/components/icons";
import { ScrollSection } from "@/components/sections";
import { BottomSheetExternalController, BottomSheetSnapPoint } from "@/components/shared/bottom-sheet/types";

import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";

import { Link } from "@/i18n/routing";
import { DiscoverInterestsList } from "@/flows/discover/modules/interests-list";
import { useSessionContext } from "@/features/session";
import { DiscoverStaticCollections } from "@/features/discover/config";

import styles from "./styles/discover-drawer.module.scss";
import { useStandaloneContext } from "@/providers/standalone.provider";

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
    const isStandalone = useStandaloneContext();

    const snapPoints: BottomSheetSnapPoint[] = isStandalone ? [.95, .5, "226px"] : [.95, .5, "206px"];

    return (
        <BottomSheetRoot
            defaultOpen
            touchEvents
            dismissible={false}
            snapPoints={snapPoints}
            fadeThreshold={.6}
            defaultSnapPointIndex={1}
            externalController={controller}
            onSnapPointChange={onSnapPointChange}
        >
            <BottomSheetPortal>
                <BottomSheetBody style={{ height: "100%" }}>
                    <div className={styles.drawer__scroll}>
                        <Scroll>
                            <Link href={DiscoverStaticCollections.Randomize}>
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
                            <div>
                                <Link href={"/profile"}>
                                    <Avatar image={session.store.user?.profile?.picture} />
                                </Link>
                            </div>
                        </BottomSheetHandle>
                        <BottomSheetScrollable>
                            <ScrollSection
                                title={"Don’t Miss in Vinnitsa"}
                                cta={"See all"}
                                variant={"text-accent"}
                                ctaHref={DiscoverStaticCollections.Highlights}
                                className={styles.drawer__gap}
                            >
                                {
                                    cityHighlights.map(event => (
                                        <Link
                                            key={event.id}
                                            href={DiscoverStaticCollections.Root + "/event/" + event.id}
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
                                            href={DiscoverStaticCollections.Root + "/" + interest.slug}
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
