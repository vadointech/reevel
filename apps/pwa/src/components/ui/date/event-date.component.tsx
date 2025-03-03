import { ComponentProps } from 'react';

import styles from "./styles.module.scss"
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

export const EventDate = ({ ...props }: EventDate.Props) => {
    return (
        <div className={styles.date} {...props}>
            <IconCalendar />
            Thuesdat, Aug 4 • 18:00
        </div>
    );
};