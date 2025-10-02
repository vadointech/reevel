"use client";

import { useSessionContext } from "@/features/session";

import {
    ProfileSettingsBottomSheet,
    ProfileSettingsBottomSheetTrigger,
    ProfileSettingsBottomSheetContent,
} from "../../bottom-sheet";

import { Avatar, Checkbox, OptionsList, OptionsListItem } from "@/components/ui";
import { IconArrowRight, IconPlus } from "@/components/icons";

import styles from "../styles/account-picker.module.scss";

export namespace ProfileSettingsAccountPicker {
    export type Props = never;
}

export const ProfileSettingsAccountPicker = () => {

    const session = useSessionContext();

    return (
        <ProfileSettingsBottomSheet>
            <ProfileSettingsBottomSheetTrigger>
                <OptionsList>
                    <OptionsListItem
                        weight={"bold"}
                        variant={"avatar"}
                        label={session.store.user?.profile?.fullName}
                        description={session.store.user?.email}
                        contentLeft={<Avatar image={session.store.user?.profile?.picture} />}
                        contentRight={<IconArrowRight />}
                    />
                </OptionsList>
            </ProfileSettingsBottomSheetTrigger>

            <ProfileSettingsBottomSheetContent
                title="Account management"
                size="small"
            >
                <OptionsList>
                    <OptionsListItem
                        weight={"bold"}
                        variant={"avatar"}
                        label={session.store.user?.profile?.fullName}
                        description={session.store.user?.email}
                        contentLeft={<Avatar image={session.store.user?.profile?.picture} />}
                        contentRight={<Checkbox checked />}
                    />
                    <OptionsListItem
                        weight={"bold"}
                        variant={"avatar"}
                        label="Add another account"
                        description="Easily connect another account using Google or Apple login."
                        contentLeft={<Plus />}
                        contentRight={<IconArrowRight />}
                    />
                </OptionsList>
            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet >
    );
};


export const Plus = () => {
    return (
        <div className={styles.plus}>
            <IconPlus />
        </div>
    );
};
