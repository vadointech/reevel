"use client";

import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { Button, Container, Input } from "@/components/ui";
import { IconCheck, IconSearch } from "@/components/icons";
import { InterestsSection } from "@/components/shared/interests-section";
import { TabButton } from "@/components/ui/tab-button";
import { useEventStore } from "../../../features/_event";
import { InterestEntity } from "@/entities/interests";
import { observer } from "mobx-react-lite";
import { useInterestSearch } from "@/features/_event/hooks/use-interest-search.hook";

export namespace InterestsDrawer {
    export type Props = {
        open?: boolean;
        initialInterests: InterestEntity[];
        onClose?: () => void;
    };
}

export const InterestsDrawer = observer(({ open, initialInterests, onClose }: InterestsDrawer.Props) => {
    const eventStore = useEventStore();

    const { interests, searchValue, handlePickInterest, onSearchValueChange } = useInterestSearch(initialInterests);

    return (
        <div>
            <Drawer open={open}>
                <DrawerBody>
                    <DrawerContent>
                        <div>
                            <Input
                                placeholder={"Enter interest"}
                                variant={"rounded"}
                                icon={<IconSearch />}
                                value={searchValue}
                                onChange={onSearchValueChange}
                            />
                        </div>

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
                {open && (
                    <Container className={styles.drawer__buttons}>
                        <Button
                            variant="default"
                            className={styles.drawer__button}
                            onClick={onClose}
                            iconBefore={<IconCheck width={16} height={16} />}
                        >
                            Done
                        </Button>
                    </Container>
                )}
            </Drawer>
        </div>
    );
});


const InterestItem = observer((
    { selected, handlePickInterest, interest }: {
        selected: boolean;
        handlePickInterest: (interest: InterestEntity) => void;
        interest: InterestEntity;
    },
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