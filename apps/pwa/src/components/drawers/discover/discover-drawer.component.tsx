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
import { GOOGLE_PLACES_API_INCLUDED_TYPES } from "@/features/location/picker";
import { IconStars } from "@/components/icons";
import { ScrollSection } from "@/components/sections";
import { MapView } from "@/components/shared/map";
import { EventEntity } from "@/entities/event";

import styles from "./styles/discover-drawer.module.scss";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks/use-discover-drawer-map.hook";

export namespace DiscoverDrawer {
    export type Data = {
        eventsInit: EventEntity[]
    };
    export type Props = Data;
}

export const DiscoverDrawer = ({ eventsInit }: DiscoverDrawer.Props) => {

    const {
        defaultPoints,
        PICKER_MAP_PADDING,
        handlePrecacheSpatialData,
        handleViewportChange,
        handlePickerSnapPointChange,
    } = useDiscoverDrawerMap(eventsInit);

    return (
        <>
            <MapView
                points={defaultPoints}
                viewState={{
                    padding: PICKER_MAP_PADDING,
                }}
                onMapReady={handlePrecacheSpatialData}
                onMoveEnd={handleViewportChange}
            />
            <BottomSheetRoot
                defaultOpen
                touchEvents
                dismissible={false}
                snapPoints={[.95, .5, .18]}
                fadeThreshold={.6}
                defaultSnapPointIndex={1}
                onSnapPointChange={handlePickerSnapPointChange}
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
                                    GOOGLE_PLACES_API_INCLUDED_TYPES.display.map(item => (
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
                                    <EventCard
                                        size={"small"}
                                        poster={"/assets/temp/poster5.png"}
                                        primaryColor={"#AB002F"}
                                        title={"Happy Valentine's Day Party"}
                                        location={"ТЦ SkyPark"}
                                        type={"Public"}
                                    />
                                    <EventCard
                                        size={"small"}
                                        poster={"/assets/temp/poster5.png"}
                                        primaryColor={"#AB002F"}
                                        title={"Happy Valentine's Day Party"}
                                        location={"ТЦ SkyPark"}
                                        type={"Public"}
                                    />
                                    <EventCard
                                        size={"small"}
                                        poster={"/assets/temp/poster5.png"}
                                        primaryColor={"#AB002F"}
                                        title={"Happy Valentine's Day Party"}
                                        location={"ТЦ SkyPark"}
                                        type={"Public"}
                                    />
                                </ScrollSection>

                                <ScrollSection
                                    title={"Events for You"}
                                    cta={"See all"}
                                    variant={"text-accent"}
                                >
                                    <CollectionCard
                                        title={"Astronomy"}
                                        location={"Vinnitsa"}
                                        emoji={"🔭"}
                                        primaryColor={"#0A192F"}
                                        secondaryColor={"#23395D"}
                                    />
                                    <CollectionCard
                                        title={"Bowling"}
                                        location={"Vinnitsa"}
                                        emoji={"🎳"}
                                        primaryColor={"#A54F4F"}
                                        secondaryColor={"#6A3232"}
                                    />
                                    <CollectionCard
                                        title={"Farming"}
                                        location={"Vinnitsa"}
                                        emoji={"🚜"}
                                        primaryColor={"#7D9A5D"}
                                        secondaryColor={"#4F6F3A"}
                                    />
                                </ScrollSection>
                            </BottomSheetScrollable>
                        </BottomSheetContent>
                    </BottomSheetBody>
                </BottomSheetPortal>
            </BottomSheetRoot>
        </>
    );
};
