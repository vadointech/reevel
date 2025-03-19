"use client";

import { observer } from "mobx-react-lite";
import { InterestsSection } from "@/components/shared/interests-section";
import { TabButton } from "@/components/ui/tab-button";
import { IconPlus } from "@/components/icons";
import { GetInitialInterests, GetUserInterests } from "@/api/interests";
import { useState } from "react";
import { useInterestPicker } from "@/features/event/hooks/use-interest-picker.hook";
import { useEventStore } from "@/features/event";

export namespace EventInterestsPicker {
    export type Props = {
    };
}

export const EventInterestsPicker = observer(({ }: EventInterestsPicker.Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const eventStore = useEventStore()

    const initialInterests = eventStore.initialInterests

    const { interests, handlePickInterest } = useInterestPicker(initialInterests);
    console.log(interests)
    console.log(eventStore.interests, 'event store')
    return (
        <InterestsSection title="Interests">
            {interests?.map((interest) => (
                <InterestItem
                    key={interest.slug}
                    {...interest}
                    selected={eventStore.interests.includes(interest.slug)}
                    handlePickInterest={handlePickInterest}
                />
            ))}
            <TabButton
                name="More"
                icon={<IconPlus width={10} height={10} strokeWidth={1.5} />}
                onClick={() => setOpen(!open)}
            />
        </InterestsSection>
    );
});

const InterestItem = observer((
    { selected, handlePickInterest, ...interest }: GetUserInterests.TOutput[number] & {
        selected: boolean;
        handlePickInterest: (slug: string) => void;
    }
) => {
    return (
        <TabButton
            selected={selected}
            key={interest.slug}
            name={interest.title_uk}
            icon={interest.icon}
            onClick={() => handlePickInterest(interest.slug)}
        />
    );
});
