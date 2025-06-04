"use client";

import { ComponentProps, useMemo } from "react";
import { useRouter } from "@/i18n/routing";
import { observer } from "mobx-react-lite";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";

import { useMotionRef } from "@/lib/motion";

import { OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import {
    SearchScreen,
    SearchScreenContent,
    SearchScreenLoadMoreButton,
    SearchScreeSearchBar,
} from "@/components/screens/search";
import { IconLocation } from "@/components/icons";
import { useLocationPickerSearch } from "@/features/location/picker/hooks";

import { useLocationPicker } from "@/features/location/picker";

import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";

import { IconPoint, Point } from "@/components/shared/map/types";

import styles from "./styles.module.scss";

export namespace LocationSearch {
    export type Data = {
        points: Point<IconPoint>[] | null;
    };
    export type Props = ComponentProps<"div"> & {
        placesInit: GooglePlacesApiResponse;
    };
    export type ListProps = {
        onLoadMore?: () => void;
        onLocationRestrictionSelect?: () => void;
    };
}

export const LocationSearch = ({ placesInit }: LocationSearch.Props) => {
    const { searchStore } = useLocationPicker();

    const recommendedPoints = useMemo(() => {
        return googlePlacesApiResponseMapper.toIconPoint(placesInit);
    }, [placesInit]);

    const {
        handleLoadMore,
        handleToggleLocationRestrictions,
    } = useLocationPickerSearch();

    return (
        <SearchScreen>
            <SearchScreeSearchBar
                controlHref={"/event/create/location"}
                onChange={(value) => searchStore.setSearchQuery(value)}
            />
            <SearchScreenContent>

                {
                    placesInit.places.length > 0 && (
                        <RecommendedList points={recommendedPoints} />
                    )
                }

                <NearbyList
                    onLoadMore={handleLoadMore}
                    onLocationRestrictionSelect={handleToggleLocationRestrictions}
                />

                <AllList
                    onLoadMore={handleLoadMore}
                    onLocationRestrictionSelect={handleToggleLocationRestrictions}
                />
            </SearchScreenContent>
        </SearchScreen>
    );
};

const RecommendedList = observer(({ points }: LocationSearch.Data) => {
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
                <SearchResultsList points={points} />
            </Section>
        </motion.div>
    );
});

const NearbyList = observer(({
    onLoadMore,
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
                            <SearchResultsList points={searchStore.nearbySearchResults} />
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
                            <SearchResultsList points={searchStore.allSearchResults} />
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

const SearchResultsList = ({ points }: LocationSearch.Data) => {
    const router = useRouter();
    const { confirmationStore } = useLocationPicker();
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
                        onClick={() => {
                            confirmationStore.setPoint(point);
                            router.push("/event/create/location");
                        }}
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
