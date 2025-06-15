"use client";

import { ComponentProps, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";

import { useMotionRef } from "@/lib/motion";
import { useLocationPickerSearch } from "@/features/location/picker/hooks";
import { useLocationPicker } from "@/features/location/picker";

import {
    SearchScreen,
    SearchScreenContent,
    SearchScreenSearchBar,
    SearchScreenLoadMoreButton,
} from "@/components/screens/search";

import { IconLocation } from "@/components/icons";
import { Section } from "@/components/sections";
import { OptionsList, OptionsListItem } from "@/components/ui";


import { placeLocationEntityMapper } from "@/entities/place/mapper";

import { IconPoint, Point } from "@/components/shared/map/types";
import { PlaceLocationEntity } from "@/entities/place";

import styles from "./styles.module.scss";

export namespace LocationSearch {
    export type Props = ComponentProps<"div"> & {
        placesInit: PlaceLocationEntity[];
    };
    export type ListProps = {
        points?: Point<IconPoint>[] | null;
        onLoadMore?: () => void;
        onLocationPick?: (point: Point<IconPoint>) => void;
        onLocationRestrictionSelect?: () => void;
    };
}

export const LocationSearch = ({ placesInit }: LocationSearch.Props) => {
    const { searchStore, config } = useLocationPicker();

    const recommendedPoints = useMemo(() => {
        return placeLocationEntityMapper.toIconPoint(placesInit);
    }, [placesInit]);

    const {
        handleLoadMore,
        handleLocationPick,
        handleToggleLocationRestrictions,
    } = useLocationPickerSearch();

    return (
        <SearchScreen>
            <SearchScreenSearchBar
                controlHref={config.callbackUrl + "/location"}
                onChange={(value) => searchStore.setSearchQuery(value)}
            />
            <SearchScreenContent>
                {
                    placesInit.length > 0 && (
                        <RecommendedList
                            points={recommendedPoints}
                            onLocationPick={handleLocationPick}
                        />
                    )
                }

                <NearbyList
                    onLoadMore={handleLoadMore}
                    onLocationPick={handleLocationPick}
                    onLocationRestrictionSelect={handleToggleLocationRestrictions}
                />

                <AllList
                    onLoadMore={handleLoadMore}
                    onLocationPick={handleLocationPick}
                    onLocationRestrictionSelect={handleToggleLocationRestrictions}
                />
            </SearchScreenContent>
        </SearchScreen>
    );
};

const RecommendedList = observer(({
    points,
    onLocationPick,
}: LocationSearch.ListProps) => {
    const { searchStore } = useLocationPicker();
    const visible = searchStore.nearbySearchResults?.length === 0 && searchStore.allSearchResults?.length === 0;

    const params = useMotionRef<HTMLDivElement>(visible, (val, animate) => {
        if(val) {
            animate.start({
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
            });
        } else {
            animate.start({
                opacity: 0,
                scale: 0.96,
                y: -10,
                filter: "blur(6px)",
            });
        }
    });

    return (
        <motion.div
            {...params}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={styles.screen__block}
        >
            <Section title={"Recommended for you"}>
                <SearchResultsList onLocationPick={onLocationPick} points={points} />
            </Section>
        </motion.div>
    );
});

const NearbyList = observer(({
    onLoadMore,
    onLocationPick,
    onLocationRestrictionSelect,
}: LocationSearch.ListProps) => {
    const { searchStore } = useLocationPicker();

    const visible = searchStore.nearbySearchResults ?
        (searchStore.nearbySearchResults.length > 0 && searchStore.locationRestrictions) : true;


    return (
        <AnimatePresence>
            {
                visible && (
                    <MotionListSection>
                        <Section
                            title={"Around Vinnitsa"}
                            cta={"See all"}
                            onCtaClick={onLocationRestrictionSelect}
                        >
                            <SearchResultsList
                                onLocationPick={onLocationPick}
                                points={searchStore.nearbySearchResults}
                            />
                        </Section>
                        {
                            searchStore.nextPageToken ? (
                                <SearchScreenLoadMoreButton onClick={onLoadMore} />
                            ) : null
                        }
                    </MotionListSection>
                )
            }
        </AnimatePresence>
    );
});

const AllList = observer(({
    onLoadMore,
    onLocationPick,
    onLocationRestrictionSelect,
}: LocationSearch.ListProps) => {
    const { searchStore } = useLocationPicker();

    const visible = searchStore.allSearchResults ?
        (searchStore.allSearchResults.length > 0 && !searchStore.locationRestrictions) : true;

    return (
        <AnimatePresence>
            {
                visible && (
                    <MotionListSection>
                        <Section
                            title={"All results"}
                            cta={"See in Vinnitsa"}
                            onCtaClick={onLocationRestrictionSelect}
                        >
                            <SearchResultsList
                                onLocationPick={onLocationPick}
                                points={searchStore.allSearchResults}
                            />
                        </Section>
                        {
                            searchStore.nextPageToken ? (
                                <SearchScreenLoadMoreButton onClick={onLoadMore} />
                            ) : null
                        }
                    </MotionListSection>
                )
            }
        </AnimatePresence>
    );
});

const SearchResultsList = ({ points, onLocationPick }: LocationSearch.ListProps) => {
    return (
        <OptionsList>
            {
                points ? points.map((point, index) => (
                    <OptionsListItem
                        key={index}
                        size={"small"}
                        label={point.properties.label}
                        description={point.properties.address}
                        contentLeft={<IconLocation />}
                        onClick={() => onLocationPick?.(point)}
                    />
                )) : (
                    <>No result found. Try another search query.</>
                )
            }
        </OptionsList>
    );
};

const MotionListSection = (props: HTMLMotionProps<"div">) => {
    return (
        <motion.div
            key={"results"}
            initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
                filter: "blur(6px)",
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                },
            }}
            exit={{
                opacity: 0,
                scale: 0.95,
                y: -10,
                filter: "blur(4px)",
            }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={styles.screen__block}
            {...props}
        />
    );
};
