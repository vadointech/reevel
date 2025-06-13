"use client";

import { Container } from "@/components/ui";
import { observer } from "mobx-react-lite";
import { useLocationSearchContext } from "@/features/location/search";
import { useLocationSearch } from "@/features/location/search/hooks";

import { Header, OptionsList, OptionsListItem } from "@/components/ui";
import { IconNavigation } from "@/components/icons";

import { PlaceLocationEntity } from "@/entities/place";

import styles from "./styles.module.scss";

export namespace LocationSearchScreen {
    export type Props = {
        initialResults?: PlaceLocationEntity[];
    };
    export type ListProps = {
        onSelect: (item: PlaceLocationEntity) => void;
        initialResults?: PlaceLocationEntity[];
    };
}

export const LocationSearchScreen = ({ initialResults }: LocationSearchScreen.Props) => {
    const {
        containerRef,
        handleLocationSelect,
    } = useLocationSearch(initialResults);

    return (
        <div className={styles.search}>
            <SearchBar />
            <Container ref={containerRef} className={styles.search__list}>
                <OptionsList spacingMode={"padding"}>
                    <List onSelect={handleLocationSelect} initialResults={initialResults} />
                </OptionsList>
            </Container>
        </div>
    );
};

export const SearchBar = observer(() => {

    const { store, config } = useLocationSearchContext();

    return (
        <Header.Search
            value={store.searchQuery}
            className={styles.search__header}
            controlHref={config.callbackUrl}
            onChange={(e) => store.setSearchQuery(e.target.value)}
        />
    );
});

export const List = observer(({ onSelect, initialResults }: LocationSearchScreen.ListProps) => {
    const { store } = useLocationSearchContext();

    if(!store.searchResults && initialResults) {
        return initialResults?.map((place) => (
            <OptionsListItem
                key={place.id}
                size={"small"}
                data-location={place.id}
                label={place.displayName}
                description={place.formattedAddress}
                contentLeft={<IconNavigation />}
                onClick={() => onSelect(place)}
            />
        ));
    }

    if(!store.searchResults || store.searchResults.length === 0) {
        return <>No locations found. Try another search query.</>;
    }

    return store.searchResults.map((place) => (
        <OptionsListItem
            key={place.id}
            size={"small"}
            label={place.displayName}
            description={place.formattedAddress}
            contentLeft={<IconNavigation />}
            onClick={() => onSelect(place)}
        />
    ));
});
