"use client";

import { observer } from "mobx-react-lite";

import { useInterestsPicker, useInterestsPickerStore, useInterestsSearch } from "@/features/interests/picker";
import { useRelatedInterests } from "@/features/interests/picker/hooks/use-related.hook";

import { Checkbox, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";

import { InterestEntity } from "@/entities/interests";

export namespace SearchInterestsAll {
    export type Props = never;

    export type ListProps = {
        onSelect: (item: InterestEntity) => void
        onLoadMore: () => void;
    };
}

export const SearchInterestsAll = () => {
    const interestsPickerStore = useInterestsPickerStore();

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
                interestsPickerStore.setSearchTerm("");
            }
        },
        onRemove: () => {
            interestsPickerStore.setSearchTerm("");
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
    const { interests, selectedInterests } = useInterestsPickerStore();

    return (
        <>
            <OptionsList>
                {
                    interests.length > 0 ? (
                        interests.map((interest) => (
                            <OptionsListItem
                                key={interest.slug}
                                label={interest.title_en}
                                contentLeft={interest.icon}
                                contentRight={
                                    <Checkbox checked={selectedInterests.some((item) => item.slug === interest.slug)} />
                                }
                                onClick={() => onSelect(interest)}
                            />
                        ))
                    ) : <>No interests found. Try another search query.</>
                }
            </OptionsList>
        </>
    );

});
