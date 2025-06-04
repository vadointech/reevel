"use client";

import { observer } from "mobx-react-lite";

import { useInterestsPicker, useInterestsPickerStore } from "@/features/interests/picker";

import { Checkbox, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";

import { InterestEntity } from "@/entities/interests";

import styles from "../styles.module.scss";

export namespace SearchInterestsSelected {
    export type Props = never;

    export type ListProps = {
        handleRemove: (item: InterestEntity) => void
    };
}

export const SearchInterestsSelected = () => {
    const { handleRemoveInterest } = useInterestsPicker();
    return (
        <List handleRemove={handleRemoveInterest} />
    );
};

const List = observer(({ handleRemove }: SearchInterestsSelected.ListProps) => {
    const interestsPickerStore = useInterestsPickerStore();

    if(interestsPickerStore.selectedInterests.length === 0) return;

    return (
        <Section
            title={"Selected interests"}
            className={styles.search__gap}
        >
            <OptionsList>
                {
                    interestsPickerStore.selectedInterests.map((interest) => (
                        <OptionsListItem
                            key={interest.slug}
                            label={interest.title_en}
                            contentLeft={interest.icon}
                            contentRight={
                                <Checkbox checked={true} />
                            }
                            onClick={() => handleRemove(interest)}
                        />
                    ))
                }
            </OptionsList>
        </Section>
    );
});