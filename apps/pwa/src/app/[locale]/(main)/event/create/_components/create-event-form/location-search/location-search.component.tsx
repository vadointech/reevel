"use client";

import { ComponentProps, useMemo } from "react";
import { Button, Header, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { IconLocation } from "@/components/icons";
import { useLocationPickerSearch } from "@/features/location/picker/hooks";

import { observer } from "mobx-react-lite";
import { useLocationPicker } from "@/features/location/picker";
import { IconPoint, Point } from "@/components/shared/map/types";
import { AnimatePresence, motion } from "motion/react";

import { useMotionRef } from "@/lib/motion";
import { useRouter } from "@/i18n/routing";
import { useQueryClient } from "@tanstack/react-query";
import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";

import styles from "./styles.module.scss";

export namespace LocationSearch {
    export type Data = {
        placesInit: Point<IconPoint>[];
    };
    export type Props = ComponentProps<"div"> & {
        queryKey?: unknown[];
    };
}

export const LocationSearch = ({ queryKey }: LocationSearch.Props) => {
    const queryClient =useQueryClient();

    const placesInit: Point<IconPoint>[] = useMemo(() => {
        if(!queryKey) return [];

        const data = queryClient.getQueryData<GooglePlacesApiResponse>(queryKey);

        if(data) return googlePlacesApiResponseMapper.toIconPoint(data).slice(0, 5);
        return [];
    }, [queryKey]);

    return (
        <div className={styles.search}>
            <SearchBar />
            <div className={styles.search__content}>

                {
                    placesInit.length > 0 && (
                        <RecommendedList placesInit={placesInit} />
                    )
                }

                <NearbyList />

                <AllList />
            </div>
        </div>
    );
};

const SearchBar = observer(() => {
    const { searchQuery, handleSetSearchQuery } = useLocationPickerSearch();
    return (
        <Header.Search
            value={searchQuery}
            className={styles.search__header}
            controlHref={"/event/create/location"}
            onChange={handleSetSearchQuery}
        />
    );
});

const RecommendedList = observer(({ placesInit }: LocationSearch.Data) => {
    const { searchStore, confirmationStore } = useLocationPicker();
    const router = useRouter();

    const resultsLength = searchStore.searchResults.length;

    const params = useMotionRef<HTMLDivElement, number>(resultsLength, (val, animate) => {
        if(val === 0) {
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
            className={styles.search__block}
        >
            <Section title={"Recommended for you"}>
                <OptionsList>
                    {
                        placesInit.map((point, index) => (
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
                        ))
                    }
                </OptionsList>
            </Section>
        </motion.div>
    );
});

const NearbyList = observer(() => {
    const { searchStore, confirmationStore } = useLocationPicker();
    const router = useRouter();

    const show = searchStore.searchResults.length > 0 && searchStore.locationRestrictions;

    return (
        <AnimatePresence>
            {
                show && (
                    <motion.div
                        key={"results"}
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 20,
                            filter: "blur(6px)",
                            transition: { delay: 0.2 },
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
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
                        className={styles.search__block}
                    >
                        <Section
                            title={"Around Vinnitsa"}
                            cta={"See all"}
                            onCtaClick={() => searchStore.setLocationRestrictions(false)}
                        >
                            <OptionsList>
                                {
                                    searchStore.searchResults.map((point, index) => (
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
                                    ))
                                }
                            </OptionsList>
                        </Section>

                        <Button
                            size={"small"}
                            variant={"text-primary"}
                        >
                            Load more
                        </Button>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
});

const AllList = observer(() => {
    const router = useRouter();
    const { searchStore, confirmationStore } = useLocationPicker();
    const show = searchStore.searchResults.length > 0 && !searchStore.locationRestrictions;

    return (
        <AnimatePresence>
            {
                show && (
                    <motion.div
                        key={"results"}
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 20,
                            filter: "blur(6px)",
                            transition: { delay: 0.2 },
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
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
                        className={styles.search__block}
                    >
                        <Section
                            title={"All results"}
                            cta={"See in Vinnitsa"}
                            onCtaClick={() => searchStore.setLocationRestrictions(true)}
                        >
                            <OptionsList>
                                {
                                    searchStore.searchResults.map((point, index) => (
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
                                    ))
                                }
                            </OptionsList>
                        </Section>

                        <Button
                            size={"small"}
                            variant={"text-primary"}
                        >
                            Load more
                        </Button>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
});
