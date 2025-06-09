"use client";

import { observer } from "mobx-react-lite";

import { useInterestsPickerContext } from "@/features/interests/picker";
import { useInterestsPicker } from "@/features/interests/picker/hooks";

import { Checkbox, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";

import styles from "../styles.module.scss";

export namespace SearchInterestsSelected {
    export type Props = never;
}

export const SearchInterestsSelected = observer(() => {
    const { handleRemoveInterest } = useInterestsPicker();
    const { store } = useInterestsPickerContext();

    if(store.selectedInterests.length === 0) return;

    return (
        <Section
            title={"Selected interests"}
            className={styles.search__gap}
        >
            <OptionsList>
                {
                    store.selectedInterests.map((interest) => (
                        <OptionsListItem
                            key={interest.slug}
                            label={interest.title_en}
                            contentLeft={interest.icon}
                            contentRight={
                                <Checkbox checked={true} />
                            }
                            onClick={() => handleRemoveInterest(interest)}
                        />
                    ))
                }
            </OptionsList>
        </Section>
    );
});