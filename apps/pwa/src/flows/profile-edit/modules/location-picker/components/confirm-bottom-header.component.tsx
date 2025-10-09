"use client";

import { IconArrowLeft } from "@/components/icons";
import { Button, Header } from "@/components/ui";

import styles from "../styles/confirm-bottom-header.module.scss";
import { useRouter } from "@/i18n/routing";

export namespace ConfirmBottomHeader {
    export type Props = never;
}

export const ConfirmBottomHeader = () => {
    const router = useRouter();

    const ControlAfter = (
        <Button
            className={styles.button}
            variant="text-accent"
        >
            Locate me
        </Button>
    );


    return (
        <Header
            size={"small"}
            controlBefore={<IconArrowLeft />}
            controlAfter={ControlAfter}
            onControlBeforeClick={() => router.push("/profile/edit")}
        >
            Location
        </Header>
    );
};
