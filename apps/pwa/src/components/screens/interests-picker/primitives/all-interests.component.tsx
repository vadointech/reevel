"use client";

import { observer } from "mobx-react-lite";

import { useInterestsPicker, useInterestsPickerStore } from "@/features/interests/picker";
import { useRelatedInterests } from "@/features/interests/picker/hooks/use-related.hook";

import { OptionsList, Section } from "@/components/shared/_redesign";
import { InterestsPickerScreenListItem } from "./list-item.component";

import { InterestEntity } from "@/entities/interests";

export namespace SearchInterestsAll {
    export type Props = never;

    export type ListProps = {
        handleSelect: (item: InterestEntity) => void
    };
}

export const SearchInterestsAll = () => {
    const interestsPickerStore = useInterestsPickerStore();

    const {
        isExist,
        getRelated,
    } = useRelatedInterests();

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
            <OptionsList style={{ gap: 0 }}>
                <List handleSelect={handleToggleInterest} />
            </OptionsList>
        </Section>
    );
};

const List = observer(({ handleSelect }: SearchInterestsAll.ListProps) => {
    const { interests, selectedInterests } = useInterestsPickerStore();

    return (
        <>
            {
                interests.map((interest) => (
                    <InterestsPickerScreenListItem
                        key={interest.slug}
                        interest={interest}
                        selected={selectedInterests.some((item) => item.slug === interest.slug)}
                        onClick={() => handleSelect(interest)}
                    />
                ))
            }
        </>
    );
});
