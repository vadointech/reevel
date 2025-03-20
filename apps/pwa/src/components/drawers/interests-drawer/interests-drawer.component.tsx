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
export namespace InterestsDrawer {
    export type Props = {
        open?: boolean;
    };
}

export const InterestsDrawer = ({ open }: InterestsDrawer.Props) => {
    const eventStore = useEventStore();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: interests, isLoading } = useQuery({
        queryKey: ["interests", searchTerm],
        queryFn: () => searchInterests({ params: { s: searchTerm } }),
        enabled: true
    });

    const interestss = interests || []

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
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                interests?.data?.map((interest) => (
                                    <TabButton
                                        selected={false}
                                        key={interest.slug}
                                        name={interest.title_en}
                                        icon={interest.icon}
                                    />
                                ))
                            )}
                        </InterestsSection>
                    </DrawerContent>
                </DrawerBody>
            </Drawer>

            {open && (
                <Container className={styles.drawer__buttons}>
                    <Button variant="default" className={styles.drawer__button}>
                        Done
                    </Button>
                </Container>
            )}
        </div>
    );
};
