"use client";

import { ComponentProps } from "react";
import { Button, Header, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { IconLocation } from "@/components/icons";
import { useLocationPickerSearch } from "@/features/location/picker/hooks";

import { observer } from "mobx-react-lite";
import { useLocationPicker } from "@/features/location/picker";
import { IconPoint, Point } from "@/components/shared/map/types";
import { AnimatePresence, motion } from "motion/react";

import styles from "./styles.module.scss";
import { useMotionRef } from "@/lib/motion";
import { useRouter } from "@/i18n/routing";

export namespace LocationSearch {
    export type Data = {
        placesInit: Point<IconPoint>[]
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const LocationSearch = ({ placesInit }: LocationSearch.Props) => {
    return (
        <div className={styles.search}>
            <SearchBar />
            <div className={styles.search__content}>

                <RecommendedList placesInit={placesInit} />

                <NearbyList />
            </div>
        </div>
    );
};

const SearchBar = observer(() => {
    const { searchTerm, handleSearch } = useLocationPickerSearch();
    return (
        <Header.Search
            value={searchTerm}
            className={styles.search__header}
            controlHref={"/event/create/location"}
            onChange={handleSearch}
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
                                    confirmationStore.setLocation(point.geometry.coordinates);
                                    router.push("/event/create/location/confirm");
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

    return (
        <AnimatePresence>
            {
                searchStore.searchResults.length > 0 && (
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
                            title={"Nearby"}
                            cta={"See all"}
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
                                                confirmationStore.setLocation(point.geometry.coordinates);
                                                router.push("/event/create/location/confirm");
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
