"use client";

import { ComponentProps } from "react";
import { Header, OptionsList, OptionsListItem } from "@/components/shared/_redesign";
import { IconLocation } from "@/components/icons";
import { Container } from "@/components/ui";
import { Controller } from "react-hook-form";

import styles from "./styles.module.scss";

export namespace LocationSearch {
    export type Props = ComponentProps<"div">;
}

export const LocationSearch = ({ ...props }: LocationSearch.Props) => {
    return (
        <div className={styles.search}>
            <Header.Search
                className={styles.search__header}
                controlHref={"/event/create/location"}
            />

            <Container>
                <Controller
                    name={"location"}
                    render={({ field }) => {
                        return (
                            <OptionsList>
                                {
                                    Array.from({ length: 8 }).map((_, index) => (
                                        <OptionsListItem
                                            key={index}
                                            size={"small"}
                                            label={"Vinnitsa"}
                                            description={"Vinnitsa, Ukraine"}
                                            contentLeft={<IconLocation />}
                                            onClick={() => {
                                                field.onChange({
                                                    label: "Vinnitsa",
                                                    coordinates: [index, index],
                                                });
                                            }}
                                        />
                                    ))
                                }
                            </OptionsList>
                        );
                    }}
                />
            </Container>
        </div>
    );
};
