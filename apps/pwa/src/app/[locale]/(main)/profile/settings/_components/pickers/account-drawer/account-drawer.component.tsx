"use client"

import { OptionsList, OptionsListItem } from "@/components/shared/_redesign"
import { Back, IconPlus } from "@/components/icons"
import { Checkbox } from "@/components/shared/checkbox"
import Image from "next/image"

import styles from "./styles.module.scss"
import { ProfileSettingsBottomSheet, ProfileSettingsBottomSheetTrigger, ProfileSettingsBottomSheetContent } from "../../bottom-sheet"



export namespace AccountDrawer {
    export type Props = never;
}

export const AccountDrawer = () => {

    return (
        <ProfileSettingsBottomSheet>
            <ProfileSettingsBottomSheetTrigger>
                <OptionsList>
                    <OptionsListItem
                        label="Jimmy Smdasith"
                        description="jimmy_smith@gmail.com"
                        contentLeft={<Image src={"/assets/temp/avatar.png"} alt={'Current account'} width={44} height={44} className={styles.image} />}
                        contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                        variant={"avatar"}
                    />
                </OptionsList>
            </ProfileSettingsBottomSheetTrigger>

            <ProfileSettingsBottomSheetContent
                title="Account management"
                size="small"
            >
                <OptionsList>
                    <OptionsListItem
                        label="Jimmy Smdasith"
                        description="jimmy_smith@gmail.com"
                        contentLeft={<Image src={"/assets/temp/avatar.png"} alt={'Current account'} width={44} height={44} className={styles.image} />}
                        contentRight={<Checkbox selected />}
                    />
                    <OptionsListItem
                        label="Add another account"
                        description="Easily connect another account using Google or Apple login."
                        contentLeft={<Plus />}
                        contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                    />
                </OptionsList>
            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet >
    )
}


export const Plus = () => {
    return (
        <div className={styles.plus}>
            <IconPlus width={16} height={16} color="" />
        </div>
    )
}
