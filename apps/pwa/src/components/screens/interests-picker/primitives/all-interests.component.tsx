"use client";

import { observer } from "mobx-react-lite";

import { useInterestsPickerContext } from "@/features/interests/picker";
import { useInterestsPicker, useInterestsSearch, useRelatedInterests } from "@/features/interests/picker/hooks";

import { Button, Checkbox, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { InterestEntity } from "@/entities/interests";

import styles from "@/components/screens/search/styles.module.scss";

export namespace SearchInterestsAll {
    export type Props = never;

    export type ListProps = {
        onSelect: (item: InterestEntity) => void
        onLoadMore: () => void;
    };
}

export const SearchInterestsAll = () => {
    const { store } = useInterestsPickerContext();

    const {
        isExist,
        getRelated,
    } = useRelatedInterests();

    const { handleLoadMore } = useInterestsSearch();

    const {
        handleToggleInterest,
    } = useInterestsPicker({
        onSelect: async({ slug }) => {
            const related = await getRelated(slug);
            if(isExist(related)) {
                store.setSearchTerm("");
            }
        },
        onRemove: () => {
            store.setSearchTerm("");
        },
    });

    return (
        <Section
            title={"All interests"}
        >
            <List
                onLoadMore={handleLoadMore}
                onSelect={handleToggleInterest}
            />
        </Section>
    );
};

const List = observer(({ onSelect, onLoadMore }: SearchInterestsAll.ListProps) => {
    const { store } = useInterestsPickerContext();

    return (
        <>
            <OptionsList>
                {
                    store.interests.length > 0 ? (
                        store.interests.map((interest) => (
                            <OptionsListItem
                                key={interest.slug}
                                label={interest.title_en}
                                contentLeft={interest.icon}
                                contentRight={
                                    <Checkbox checked={store.selectedInterests.some((item) => item.slug === interest.slug)} />
                                }
                                onClick={() => onSelect(interest)}
                            />
                        ))
                    ) : <>No interests found. Try another search query.</>
                }
            </OptionsList>
            <Button
                size={"small"}
                variant={"text-primary"}
                className={styles.search__more}
                onClick={onLoadMore}
            >
                Load more
            </Button>
        </>
    );

});
