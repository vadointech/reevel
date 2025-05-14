
import { ComponentProps } from "react"

import { OptionItem, Options } from "@/components/shared/options"
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/_redesign"
import { Back, IconPlus } from "@/components/icons"
import { Container } from "@/components/ui"
import { Checkbox } from "@/components/shared/checkbox"

import styles from "./styles.module.scss"
import { useSessionStore } from "@/features/session"


export namespace AccountDrawer {
    export type Props = ComponentProps<"div">
}

export const AccountDrawer = ({ }: AccountDrawer.Props) => {

    return (
        <Drawer staticPointKey="Medium">
            <DrawerTrigger className={styles.drawer__trigger}>
                <OptionItem label="Jimmy Smdasith" description="jimmy_smith@gmail.com" image={"/assets/temp/avatar.png"}>
                    <Back width={7} height={14} style={{ rotate: "180deg" }} />
                </OptionItem>
            </DrawerTrigger>
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <h2>Account managment</h2>
                    <Container>
                        <Options>
                            <OptionItem label="Jimmy Smdasith" description="jimmy_smith@gmail.com" image={"/assets/temp/avatar.png"}>
                                <Checkbox selected />
                            </OptionItem>
                            <OptionItem
                                label="Add another account"
                                description="Easily connect another account using Google or Apple login."
                                icon={<Plus />}>
                                <Back width={7} height={14} style={{ rotate: "180deg" }} />
                            </OptionItem>
                        </Options>
                    </Container>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
}


export const Plus = () => {
    return (
        <div className={styles.plus}>
            <IconPlus width={16} height={16} color="" />
        </div>
    )
}