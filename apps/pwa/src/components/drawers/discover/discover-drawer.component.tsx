"use client";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot, BottomSheetScrollable,
} from "@/components/shared/bottom-sheet";

import { Input, InterestButton, Scroll } from "@/components/ui";
import { IconStars } from "@/components/icons";
import { BottomSheetExternalController, BottomSheetSnapPoint } from "@/components/shared/bottom-sheet/types";

import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";

import { Link } from "@/i18n/routing";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { useStandaloneContext } from "@/providers/standalone.provider";
import { HighlightsCollectionSlider, InterestsCollectionSlider, DiscoverInterestsList } from "./components";
import { CitiesEntity } from "@/entities/cities";

import styles from "./styles/discover-drawer.module.scss";
import { SessionAvatar } from "@/components/shared/session-avatar";

export namespace DiscoverDrawer {
    export type Data = {
        cityInit?: CitiesEntity;
        interestsInit: InterestEntity[];
        interestCollectionsInit: InterestEntity[];
        highlightsInit: EventEntity[];
    };
    export type Props = Data & {
        controller?: BottomSheetExternalController;
        onSnapPointChange?: (snapPointIndex: number) => void;
        onEventInterestPick: (pointId: string | null) => void;
    };
}

export const DiscoverDrawer = ({
    cityInit,
    interestsInit,
    interestCollectionsInit,
    highlightsInit,
    controller,
    onSnapPointChange,
    onEventInterestPick,
}: DiscoverDrawer.Props) => {
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
                                interestsInit={interestsInit}
                                onEventInterestPick={onEventInterestPick}
                            />
                        </Scroll>
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.drawer__handle}>
                            <Input.Search placeholder={"Search"} />
                            <SessionAvatar />
                        </BottomSheetHandle>
                        <BottomSheetScrollable>
                            <HighlightsCollectionSlider
                                cityInit={cityInit}
                                eventsInit={highlightsInit}
                            />
                            <InterestsCollectionSlider
                                interestsInit={interestCollectionsInit}
                            />
                        </BottomSheetScrollable>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};