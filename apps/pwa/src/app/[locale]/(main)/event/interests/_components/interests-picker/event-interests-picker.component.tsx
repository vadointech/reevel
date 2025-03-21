"use client";

import { observer } from "mobx-react-lite";
import { InterestsSection } from "@/components/shared/interests-section";
import { TabButton } from "@/components/ui/tab-button";
import { IconPlus } from "@/components/icons";
import { useState } from "react";
import { useInterestPicker } from "@/features/event/hooks/use-interest-picker.hook";
import { useEventStore } from "@/features/event";
import { InterestsDrawer } from "@/components/drawers/interests-drawer";
import { InterestEntity } from "@/entities/interests";

export namespace EventInterestsPicker {
    export type Props = {
        userInterests: InterestEntity[]
        initialInterests: InterestEntity[]
    };
}

export const EventInterestsPicker = observer(({ userInterests, initialInterests }: EventInterestsPicker.Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const eventStore = useEventStore()

    const onClose = () => {
        setOpen(false)
    }

    const { interests, handlePickInterest } = useInterestPicker(userInterests ?? []);


    return (
        <InterestsSection title="Interests">
            {interests?.map((interest) => (
                <InterestItem
                    interest={interest}
                    key={interest.slug}
                    {...interest}
                    selected={eventStore.interests.some((item) => item.slug === interest.slug)}
                    handlePickInterest={handlePickInterest}
                />
            ))}
            <TabButton
                name="More"
                icon={<IconPlus width={10} height={10} strokeWidth={1.5} />}
                onClick={() => setOpen(!open)}
            />

            <InterestsDrawer open={open} initialInterests={initialInterests} onClose={onClose} />
        </InterestsSection>

    );
});

const InterestItem = observer((
    { selected, handlePickInterest, interest }: {
        selected: boolean;
        handlePickInterest: (interest: InterestEntity) => void;
        interest: InterestEntity;
    }
) => {
    return (
        <TabButton
            selected={selected}
            key={interest.slug}
            name={interest.title_en}
            icon={interest.icon}
            onClick={() => handlePickInterest(interest)}
        />
    );
});
