import { ComponentProps } from 'react';

import styles from "./styles.module.scss"
import cx from "classnames"

import { IconCalendar } from '@/components/icons';


export namespace EventDate {
    export type Props = ComponentProps<"div"> & {
        // day?: string,
        // month?: string,
        // time?: number
    }
}
// я хз як дату там з бека будемо брати, в юніксі чи просто данні, 
//но мені кажеться що в юніксі, через то поки закоменчене хай буде

export const EventDate = ({ className, ...props }: EventDate.Props) => {
    return (
        <div className={cx(styles.date, className)} {...props}>
            <IconCalendar />
            Thuesdat, Aug 4 • 18:00
        </div>
    );
};