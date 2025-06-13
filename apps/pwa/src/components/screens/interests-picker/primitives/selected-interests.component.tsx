"use client";

import { observer } from "mobx-react-lite";

import { useInterestsPickerContext } from "@/features/interests/picker";
import { useInterestsPicker } from "@/features/interests/picker/hooks";

import { Section } from "@/components/sections";
import { Checkbox, MotionOptionsList, MotionOptionsListItem } from "@/components/ui";

export namespace SearchInterestsSelected {
    export type Props = never;
}

export const SearchInterestsSelected = observer(() => {
    const { handleRemoveInterest } = useInterestsPicker();
    const { store } = useInterestsPickerContext();

    if(store.selectedInterests.length === 0) return;

    return (
        <Section title={"Selected interests"}>
            <MotionOptionsList>
                {
                    store.selectedInterests.map((interest, index) => (
                        <MotionOptionsListItem
                            index={index}
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
            </MotionOptionsList>
        </Section>
    );
});