"use client";

import { observer } from "mobx-react-lite";
import { OptionsList, Section } from "@/components/shared/_redesign";
import { useInterestsPicker, useRelatedInterests } from "@/features/interests";
import { useInterestsPickerStore } from "@/features/interests/interests-picker";
import { InterestEntity } from "@/entities/interests";
import { InterestsPickerScreenListItem } from "./list-item.component";

export namespace SearchInterestsAll {
    export type Props = never;

    export type ListProps = {
        handleSelect: (item: InterestEntity) => void
    };
}

export const SearchInterestsAll = () => {
    const interestsPickerStore = useInterestsPickerStore();

    const {
        getRelated,
    } = useRelatedInterests({
        onSettled: (_, int) => {
            const isExists = interestsPickerStore.interests.some(item => int.every(i => item.slug === i.slug));
            if(isExists) {
                interestsPickerStore.setSearchTerm("");
            }
        },
    });

    const {
        handleToggleInterest,
    } = useInterestsPicker({
        onSelect: ({ slug }) => {
            getRelated(slug);
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
