"use client";

import { observer } from "mobx-react-lite";

import { useInterestsPickerContext } from "@/features/interests/picker";
import { useInterestsPicker, useInterestsSearch, useRelatedInterests } from "@/features/interests/picker/hooks";

import {
    Checkbox,
    MotionOptionsList,
    MotionOptionsListItem,
} from "@/components/ui";
import { Section } from "@/components/sections";
import { SearchScreenLoadMoreButton } from "@/components/screens/search";

import { InterestEntity } from "@/entities/interests";

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
        <Section title={"All interests"}>
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
            <MotionOptionsList>
                {
                    store.interests.length > 0 ? (
                        store.interests.map((interest, index) => (
                            <MotionOptionsListItem
                                index={index}
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
            </MotionOptionsList>
            <SearchScreenLoadMoreButton
                onClick={onLoadMore}
            />
        </>
    );

});
