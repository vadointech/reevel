"use client";

import { ReactNode, use, useEffect } from "react";
import { TimePicker as TTimePicker } from "./hooks/use-time-picker.hook";
import { useTimePickerCarousel } from "./hooks/use-picker-carousel.hook";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace TimePicker {
    export type Props = {
        controls: TTimePicker;
        label: string | ReactNode;
    };
}

export const TimePicker = ({ controls, label }: TimePicker.Props) => {
    const { wheel } = controls;

    console.log(controls)

    const [ref] = useTimePickerCarousel(controls);

    return (
        <div className={styles.embla}>
            <div className={styles.picker}>
                <div className={styles.picker__scene}>
                    <div
                        className={cx(
                            styles.picker__viewport,
                            styles[`picker__viewport_perspective_${wheel.perspective}`],
                        )}
                        ref={ref}
                    >
                        <div className={styles.picker__container}>
                            {
                                wheel.slides.map((_, index) => (
                                    <div
                                        className={styles.picker__slide}
                                        key={index}
                                    >
                                        {index}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.picker__label}>
                    {label}
                </div>
            </div>
        </div>
    );
};

