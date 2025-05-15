"use client";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
} from "@/components/shared/_redesign/bottom-sheet";
import { Button, Header, InterestButton } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";
import { Container, Scroll } from "@/components/ui";

import styles from "../styles.module.scss";
import { Link } from "@/i18n/routing";

export namespace PickLocationDrawer {
    export type Props = BottomSheetRoot.Props;
}

export const PickLocationDrawer = ({
    ...props
}: PickLocationDrawer.Props) => {
    return (
        <BottomSheetRoot
            touchEvents={true}
            dismissible={false}
            overlay={false}
            defaultOpen
            fitContent
            {...props}
        >
            <BottomSheetPortal>
                <BottomSheetBody>
                    <div className={styles.drawer__scroll}>
                        <Scroll>
                            <InterestButton variant={"background"}>
                                Keletska, 102A
                            </InterestButton>
                            <InterestButton variant={"background"}>
                                Keletska, 102A
                            </InterestButton>
                            <InterestButton variant={"background"}>
                                Keletska, 102A
                            </InterestButton>
                        </Scroll>
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle>
                            <Header
                                size={"small"}
                                iconBefore={
                                    <Link href={"/event/create"}>
                                        <IconArrowLeft />
                                    </Link>
                                }
                            >
                                Location
                            </Header>
                        </BottomSheetHandle>
                        <Container className={styles.drawer__content}>
                            <div>
                                <h1 className={styles.drawer__title}>Where’s It Happening?</h1>
                                <p className={styles.drawer__subtitle}>
                                    Mark the location of your event or specify if it’s online.
                                </p>
                            </div>
                            <div className={styles.drawer__buttons}>
                                <Button
                                    variant={"secondary-muted"}
                                    href={"/event/create/location/search"}
                                >
                                    Enter location manually
                                </Button>
                                <Button
                                    variant={"primary"}
                                >
                                    Allow location access
                                </Button>
                            </div>
                        </Container>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
