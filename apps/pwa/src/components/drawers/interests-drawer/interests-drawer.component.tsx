import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { Button, Container, Input } from "@/components/ui";
import { Search } from "@/components/icons";
import { InterestsSection } from "@/components/shared/interests-section";
import { TabButton } from "@/components/ui/tab-button";


export namespace InterestsDrawer {
    export type Props = ComponentProps<"div"> & {
        open?: boolean;
    };
}

export const InterestsDrawer = ({ open }: InterestsDrawer.Props) => {
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
                            />
                        </div>

                        <InterestsSection title="Selected" count className={styles.drawer__selected}>
                            <TabButton selected={true} key={'Music'} name={'Music'} icon={'🏐'} />
                            <TabButton selected={true} key={'Games'} name={'Games'} icon={'🏐'} />
                            <TabButton selected={true} key={'Shopping'} name={'Shopping'} icon={'🏐'} />
                            <TabButton selected={true} key={'Programming'} name={'Programming'} icon={'🏐'} />
                            <TabButton selected={true} key={'Boxing'} name={'Boxing'} icon={'🏐'} />
                        </InterestsSection>

                        <InterestsSection title="More interests" className={styles.drawer__more}>
                            <TabButton selected={false} key={'Music'} name={'Music'} icon={'🏐'} />
                            <TabButton selected={false} key={'Games'} name={'Games'} icon={'🏐'} />
                            <TabButton selected={false} key={'Shopping'} name={'Shopping'} icon={'🏐'} />
                            <TabButton selected={false} key={'Programming'} name={'Programming'} icon={'🏐'} />
                            <TabButton selected={false} key={'Boxing'} name={'Boxing'} icon={'🏐'} />
                            <TabButton selected={false} key={'Music'} name={'Music'} icon={'🏐'} />
                            <TabButton selected={false} key={'Games'} name={'Games'} icon={'🏐'} />
                            <TabButton selected={false} key={'Shopping'} name={'Shopping'} icon={'🏐'} />
                            <TabButton selected={false} key={'Programming'} name={'Programming'} icon={'🏐'} />
                            <TabButton selected={false} key={'Boxing'} name={'Boxing'} icon={'🏐'} />
                            <TabButton selected={false} key={'Music'} name={'Music'} icon={'🏐'} />
                            <TabButton selected={false} key={'Games'} name={'Games'} icon={'🏐'} />
                            <TabButton selected={false} key={'Shopping'} name={'Shopping'} icon={'🏐'} />
                            <TabButton selected={false} key={'Programming'} name={'Programming'} icon={'🏐'} />
                            <TabButton selected={false} key={'Boxing'} name={'Boxing'} icon={'🏐'} />
                        </InterestsSection>

                    </DrawerContent>
                </DrawerBody>
            </Drawer>
            {open &&
                <Container className={styles.drawer__buttons}>
                    <Button variant="default" className={styles.drawer__button}>Done</Button>
                </Container>
            }
        </div>
    );
};
