"use client";

import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import { Header, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { useSideSheetStore } from "@/components/shared/_redesign/side-sheet";
import { Container } from "@/components/ui";
import { Checkbox } from "@/components/shared/_redesign";

export namespace CreateEventFormSearchInterests {
    export type Props = ComponentProps<"div">;
}

export const CreateEventFormSearchInterests = ({ ...props }: CreateEventFormSearchInterests.Props) => {
    const sideSheetStore = useSideSheetStore();
    return (
        <div className={styles.searchInterests}>
            <Header.Search
                onControlClick={() => sideSheetStore.setClose()}
                className={styles.searchInterests__header}
            />

            <Container>
                <Section
                    title={"Selected interests"}
                    className={styles.form__gap}
                >
                    <OptionsList>
                        <OptionsListItem
                            label={"Shopping"}
                            contentLeft={"🛍️"}
                            contentRight={<Checkbox checked />}
                        />
                        <OptionsListItem
                            label={"Shopping"}
                            contentLeft={"🛍️"}
                            contentRight={<Checkbox checked />}
                        />
                    </OptionsList>
                </Section>

                <Section
                    title={"All interests"}
                >
                    <OptionsList>
                        <OptionsListItem
                            label={"Shopping"}
                            contentLeft={"🛍️"}
                            contentRight={<Checkbox />}
                        />
                        <OptionsListItem
                            label={"Shopping"}
                            contentLeft={"🛍️"}
                            contentRight={<Checkbox />}
                        />
                    </OptionsList>
                </Section>
            </Container>
        </div>
    );
};
