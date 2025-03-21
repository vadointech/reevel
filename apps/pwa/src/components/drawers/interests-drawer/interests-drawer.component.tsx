"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { Button, Container, Input } from "@/components/ui";
import { Search } from "@/components/icons";
import { InterestsSection } from "@/components/shared/interests-section";
import { TabButton } from "@/components/ui/tab-button";
import { useEventStore } from "@/features/event";
import { searchInterests } from "@/api/interests";
import { InterestEntity } from "@/entities/interests";
import { useInterestPicker } from "@/features/event/hooks/use-interest-picker.hook";
import { observer } from "mobx-react-lite";

export namespace InterestsDrawer {
    export type Props = {
        open?: boolean;
        initialInterests: InterestEntity[];
        onClose?: () => void;
    };
}

export const InterestsDrawer = ({ open, initialInterests, onClose }: InterestsDrawer.Props) => {
    const eventStore = useEventStore();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: searchResults } = useQuery({
        queryKey: ["interests", searchTerm],
        initialData: initialInterests,
        queryFn: async () => {
            const response = await searchInterests({ params: { s: searchTerm } });
            return response.data;
        },
        enabled: true,
    });

    const { interests, handlePickInterest } = useInterestPicker(searchResults ?? []);

    return (
        <div>
            <Drawer open={open} defaultPoint={"upper"}>
                <DrawerBody>
                    <DrawerContent>
                        <div>
                            <Input
                                placeholder={"Enter interest"}
                                variant={"rounded"}
                                icon={<Search />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Вибрані інтереси */}
                        <InterestsSection title="Selected" count className={styles.drawer__selected}>
                            {eventStore.interests.map((interest) => (
                                <TabButton
                                    selected={true}
                                    key={interest.slug}
                                    name={interest.title_en}
                                    icon={interest.icon}
                                />
                            ))}
                        </InterestsSection>


                        <InterestsSection title="More interests" className={styles.drawer__more}>
                            {interests?.map((interest) => (
                                <InterestItem
                                    interest={interest}
                                    key={interest.slug}
                                    selected={eventStore.interests.some((item) => item.slug === interest.slug)}
                                    handlePickInterest={handlePickInterest}
                                />
                            ))}
                        </InterestsSection>
                    </DrawerContent>
                </DrawerBody>
            </Drawer>

            {open && (
                <Container className={styles.drawer__buttons}>
                    <Button
                        variant="default"
                        className={styles.drawer__button}
                        onClick={onClose}
                    >
                        Done
                    </Button>
                </Container>
            )}
        </div>
    );
};


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