
import { ComponentProps } from "react"

import { OptionItem, Options } from "@/components/shared/options"
import { OptionsList, OptionsListItem } from "@/components/shared/_redesign"
import { Back, IconNotification, IconPlus } from "@/components/icons"
import { Container } from "@/components/ui"
import { Checkbox } from "@/components/shared/checkbox"

import styles from "./styles.module.scss"
import { useSessionStore } from "@/features/session"
import { CreateSettingsBottomSheet, CreateSettingsBottomSheetTrigger, CreateSettingsBottomSheetContent } from "../../bottom-sheet"
import { NotificationContent } from "../notification-drawer"
import Image from "next/image"


export namespace AccountDrawer {
    export type Props = ComponentProps<"div">
}

export const AccountDrawer = ({ className }: AccountDrawer.Props) => {

    return (

        <CreateSettingsBottomSheet>
            <CreateSettingsBottomSheetTrigger>
                <OptionsList>
                    <OptionsListItem
                        label="Jimmy Smdasith"
                        description="jimmy_smith@gmail.com"
                        contentLeft={<Image src={"/assets/temp/avatar.png"} alt={'tes'} width={44} height={44} className={styles.image} />}
                        contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                        variant={"avatar"}
                    />
                </OptionsList>
            </CreateSettingsBottomSheetTrigger>

            <CreateSettingsBottomSheetContent
                title="Account management"
                size="small"
            >
                <OptionsList>
                    <OptionsListItem
                        label="Jimmy Smdasith"
                        description="jimmy_smith@gmail.com"
                        contentLeft={<Image src={"/assets/temp/avatar.png"} alt={'tes'} width={44} height={44} className={styles.image} />}
                        contentRight={<Checkbox selected />}
                    />
                    <OptionsListItem
                        label="Add another account"
                        description="Easily connect another account using Google or Apple login."
                        contentLeft={<Plus />}
                        contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                    />
                </OptionsList>
            </CreateSettingsBottomSheetContent>
        </CreateSettingsBottomSheet >
    )
}


export const Plus = () => {
    return (
        <div className={styles.plus}>
            <IconPlus width={16} height={16} color="" />
        </div>
    )
}
