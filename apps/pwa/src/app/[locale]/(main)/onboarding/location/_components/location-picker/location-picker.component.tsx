"use client";

import { ComponentProps } from "react";
import { OnboardingLocationItem } from "../location-item";
import { Container, Input } from "@/components/ui";
import { Search } from "@/components/icons/search";
import { MapboxFeatureResponse } from "@/api/mapbox/types";
import { useLocationPicker } from "@/features/onboarding";

import styles from "./styles.module.scss";

export namespace OnboardingLocationPicker {
    export type Data = MapboxFeatureResponse[];
    export type Props = ComponentProps<"div"> & {
        data: Data
    };
}

export const OnboardingLocationPicker = ({ data }: OnboardingLocationPicker.Props) => {
    const {
        pickerRef,
        handleSelectLocation,
    } = useLocationPicker();

    return (
        <>
            <Container className={styles.picker__input}>
                <Input
                    variant="rounded"
                    placeholder="Search events"
                    background={"muted"}
                    icon={<Search />}
                />
            </Container>
            <Container
                ref={pickerRef}
                className={styles.picker__places}
            >
                {
                    data.map((item, i) => (
                        <OnboardingLocationItem
                            key={i}
                            data-location={item.center.join(",")}
                            onClick={() => handleSelectLocation(item)}
                            data={{ city: item.text, country: item.place_name }}
                        />
                    ))
                }
            </Container>
        </>
    );
};
