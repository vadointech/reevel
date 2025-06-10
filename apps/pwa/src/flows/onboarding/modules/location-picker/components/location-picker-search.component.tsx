"use client";

import { ComponentProps, memo } from "react";
import { OnboardingLocationItem } from "./location-item.component";
import { Container, Input } from "@/components/ui";
import { IconSearch } from "@/components/icons/search";
import { MapboxFeatureResponse } from "@/api/mapbox/types";
import { useLocationPicker } from "@/features/onboarding";
import { observer } from "mobx-react-lite";

import styles from "../styles/location-picker-search.module.scss";

export namespace OnboardingLocationPickerSearch {
    export type Data = MapboxFeatureResponse[];
    export type Props = ComponentProps<"div"> & {
        data: Data
    };

    export type LocationListProps = {
        data?: Data;
        onLocationSelect: (feature: MapboxFeatureResponse) => void;
    };
}

export const OnboardingLocationPickerSearch = observer(({ data: initialLocationList }: OnboardingLocationPickerSearch.Props) => {
    const {
        list,
        pickerRef,
        searchValue,
        onSearchValueChange,
        handleSelectLocation,
    } = useLocationPicker(initialLocationList);

    return (
        <>
            <Container className={styles.picker__input}>
                <Input
                    autoFocus
                    value={searchValue}
                    variant={"rounded"}
                    placeholder={"Search events"}
                    icon={<IconSearch />}
                    onChange={onSearchValueChange}
                />
            </Container>

            <Container
                ref={pickerRef}
                className={styles.picker__places}
            >
                <LocationList
                    data={list}
                    onLocationSelect={handleSelectLocation}
                />
            </Container>
        </>
    );
});

const LocationList = memo(({ data, onLocationSelect }: OnboardingLocationPickerSearch.LocationListProps) => {
    return data?.map((item, i) => (
        <OnboardingLocationItem
            key={i}
            data-location={item.center.join(",")}
            onClick={() => onLocationSelect(item)}
            data={{ city: item.text, country: item.place_name }}
        />
    ));
});
