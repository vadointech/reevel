"use client";

import { GetInitialInterests } from "@/api/interests";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";
import { InterestsSection } from "@/components/shared/interests-section";
import { TabButton } from "@/components/ui/tab-button";
import { IconPlus } from "@/components/icons";
import { useEventStore } from "@/features/event";
import { useState } from "react";
import { RecommendationDrawer } from "@/components/drawers/recommendation-drawer";
import { Drawer } from "@/components/shared/drawer";
import { InterestsDrawer } from "@/components/drawers/interests-drawer";


export namespace EventInterestsPicker {
    export type Props = {
        interests: GetInitialInterests.TOutput
    };
}


export const EventInterestsPicker = observer(({
    interests: interests,
}: EventInterestsPicker.Props) => {
    const [open, setOpen] = useState<boolean>(true)


    const eventStore = useEventStore()

    return (
        <InterestsSection title="Interests">
            {interests?.map((interest) => (
                <TabButton
                    selected={eventStore.interests.includes(interest.slug)}
                    key={interest.slug}
                    name={interest.title_uk}
                    icon={interest.icon}
                />
            ))}
            <TabButton name="More" icon={<IconPlus width={10} height={10} strokeWidth={1.5} />} onClick={() => setOpen(!open)} />

            <InterestsDrawer open={true} />
        </InterestsSection>);
});