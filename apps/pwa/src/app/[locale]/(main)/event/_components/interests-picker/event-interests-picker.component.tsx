"use client";

import { observer } from "mobx-react-lite";
import { TabButton } from "@/components/ui/tab-button";
import { useInterestPicker } from "@/features/event/hooks/use-interest-picker.hook";
import { useEventStore } from "@/features/event";
import { InterestEntity } from "@/entities/interests";

import styles from "./styles.module.scss"
import cx from "classnames"

import { Section, SectionItems } from "@/components/shared/section";
import { ComponentProps } from "react";
export namespace EventInterestsPicker {
    export type Props = ComponentProps<"div"> & {
        userInterests: InterestEntity[]
    };
}

export const EventInterestsPicker = observer(({ userInterests, className }: EventInterestsPicker.Props) => {
    const eventStore = useEventStore()

    const { interests, handlePickInterest } = useInterestPicker(userInterests);



    return (
        <Section title="Interests" type="See all" href="/event/interests" className={cx(styles.section, className)}>
            <SectionItems variant="flex">
                {interests?.map((interest) => (
                    <InterestItem
                        interest={interest}
                        key={interest.slug}
                        {...interest}
                        selected={eventStore.interests.some((item) => item.slug === interest.slug)}
                        handlePickInterest={handlePickInterest}
                    />
                ))}
            </SectionItems>
        </Section>

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
