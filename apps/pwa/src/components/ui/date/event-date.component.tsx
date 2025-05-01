import { ComponentProps } from 'react';

import styles from "./styles.module.scss"
import cx from "classnames"

import { IconCalendar } from '@/components/icons';


export namespace EventDate {
    export type Props = ComponentProps<"div"> & {
        date: string,
    }
}

export const EventDate = ({ className, date, ...props }: EventDate.Props) => {
    return (
        <div className={cx(styles.date, className)} {...props}>
            <IconCalendar />
            {date}
        </div>
    );
};