"use client";

import { Controller } from "react-hook-form";
import { InterestButton, Section } from "@/components/shared/_redesign";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace CreateEventFormInterestsPicker {
    export type Props = never;
}

export const CreateEventFormInterestsPicker = () => {
    return (
        <Section
            title={"Interests"}
            cta={"See all"}
            ctaHref={"/event/create/interests"}
        >
            <div className={cx(styles.form__interests, styles.form__gap)}>
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <Controller
                            key={index}
                            name={"interests"}
                            render={({ field }) => {
                                const isExists = field.value.includes(index);
                                const handleClick = () => {
                                    if(isExists) {
                                        field.onChange(
                                            field.value.filter((item: number) => item !== index),
                                        );
                                    } else {
                                        field.onChange([...field.value, index]);
                                    }
                                };
                                return (
                                    <InterestButton
                                        variant={
                                            isExists ? "primary" : "default"
                                        }
                                        icon={"🥊"}
                                        onClick={handleClick}
                                    >
                                        Boxing
                                    </InterestButton>
                                );
                            }}
                        />
                    ))
                }
            </div>
        </Section>
    );
};