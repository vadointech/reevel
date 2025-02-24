import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { Avatar, Input } from "@/components/ui";
import { Section } from "@/components/shared/section";

export namespace RecommendationDrawer {
    export type Props = ComponentProps<"div"> & {

    };
}

export const RecommendationDrawer = ({ }: RecommendationDrawer.Props) => {
    return (
        <Drawer>
            <DrawerTrigger>
                Drawer here
            </DrawerTrigger>
            <DrawerBody>
                <div>

                </div>
                <DrawerContent>
                    <div className={styles.drawer__content}>
                        <div className={styles.drawer__content__input}>
                            <Input inputSize="default" variant="rounded" placeholder="Search events" />
                            <Avatar size={40} variant="profile" />
                        </div>

                        <Section title="Events" size="small" type="All" className={styles.drawer__content__sections}>
                            <div>test</div>
                            <div>test</div>

                            <div>test</div>

                            <div>test</div>

                            <div>test</div>


                        </Section>
                    </div>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    );
};
