"use client";

import { ComponentProps } from "react";
import { Header, OptionsList, OptionsListItem } from "@/components/shared/_redesign";
import { IconLocation } from "@/components/icons";
import { Container } from "@/components/ui";
import { Controller } from "react-hook-form";
import { useLocationPickerSearch } from "@/features/location/picker/hooks";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { useLocationPicker } from "@/features/location/picker";

export namespace LocationSearch {
    export type Props = ComponentProps<"div">;
}

export const LocationSearch = ({ ...props }: LocationSearch.Props) => {
    return (
        <div className={styles.search}>
            <SearchBar />
            <Container>
                <NearbyList />
                {/*<Controller*/}
                {/*    name={"location"}*/}
                {/*    render={({ field }) => {*/}
                {/*        return (*/}
                {/*            <OptionsList>*/}
                {/*                {*/}
                {/*                    Array.from({ length: 8 }).map((_, index) => (*/}
                {/*                        <OptionsListItem*/}
                {/*                            key={index}*/}
                {/*                            size={"small"}*/}
                {/*                            label={"Vinnitsa"}*/}
                {/*                            description={"Vinnitsa, Ukraine"}*/}
                {/*                            contentLeft={<IconLocation />}*/}
                {/*                            onClick={() => {*/}
                {/*                                field.onChange({*/}
                {/*                                    label: "Vinnitsa",*/}
                {/*                                    coordinates: [index, index],*/}
                {/*                                });*/}
                {/*                            }}*/}
                {/*                        />*/}
                {/*                    ))*/}
                {/*                }*/}
                {/*            </OptionsList>*/}
                {/*        );*/}
                {/*    }}*/}
                {/*/>*/}
            </Container>
        </div>
    );
};

const SearchBar = observer(() => {
    const { searchStore } = useLocationPicker();
    const { handleSearch } = useLocationPickerSearch();
    return (
        <Header.Search
            value={searchStore.searchTerm}
            className={styles.search__header}
            controlHref={"/event/create/location"}
            onChange={handleSearch}
        />
    );
});

const NearbyList = observer(() => {
    const { searchStore } = useLocationPicker();
    return (
        <OptionsList>
            {
                searchStore.searchResults.map((point, index) => (
                    <OptionsListItem
                        key={index}
                        size={"small"}
                        label={point.properties.label}
                        description={point.properties.primaryType}
                        contentLeft={<IconLocation />}
                    />
                ))
            }
        </OptionsList>
    );
});
