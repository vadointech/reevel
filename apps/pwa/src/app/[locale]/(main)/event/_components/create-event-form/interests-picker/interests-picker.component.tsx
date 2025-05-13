"use client";

import { ComponentProps } from "react";

import { InterestButton, Section } from "@/components/shared/_redesign";
import { CreateEventFormSearchInterests } from "./search-interests.component";

import {
    SideSheetBody,
    SideSheetContent, SideSheetPortal,
    SideSheetRoot,
    useSideSheetStore,
} from "@/components/shared/_redesign/side-sheet";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace CreateEventFormInterestsPicker {
    export type Props = ComponentProps<"div">;
}

export const CreateEventFormInterestsPicker = ({ ...props }: CreateEventFormInterestsPicker.Props) => {
    return (
        <SideSheetRoot>
            <InterestsList />
        </SideSheetRoot>
    );
};

const InterestsList = () => {
    const sideSheetStore = useSideSheetStore();
    return (
        <Section
            title={"Interests"}
            cta={"See all"}
            onCtaClick={() => sideSheetStore.setOpen()}
        >
            <div className={cx(styles.form__interests, styles.form__gap)}>
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <InterestButton
                            key={index}
                            icon={"🥊"}
                        >
                            Boxing
                        </InterestButton>
                    ))
                }
            </div>
            <SideSheetPortal>
                <SideSheetBody>
                    <SideSheetContent>
                        <CreateEventFormSearchInterests />
                    </SideSheetContent>
                </SideSheetBody>
            </SideSheetPortal>
        </Section>
    );
};