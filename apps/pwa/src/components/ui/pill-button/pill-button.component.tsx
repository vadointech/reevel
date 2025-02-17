'use client'

import { ComponentProps, ReactNode } from 'react';
import styles from './styles.module.scss'
import cx from "classnames";


export namespace PillButton {
    export type Props = Omit<ComponentProps<'button'>, 'onChange'> & {
        variant?: 'default' | 'primary' | 'outline' | 'icon' | 'dashed'
        name: string
        icon?: ReactNode | string
        selected?: boolean
        onChange: (selected: boolean) => void
    }
}

export const PillButton = ({ variant = 'default', name, icon, selected = false, onChange, className, ...props }: PillButton.Props) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onChange(!selected);
    };

    return (
        <button
            type='button'
            className={cx(
                styles.button,
                styles[`button__variant_${variant}`],
                selected && styles.button__selected
            )}
            onClick={handleClick}
        >
            <div className={cx(styles.button__icon)}>
                {variant == 'icon' ? icon : icon}
            </div>
            <p>{name}</p>
        </button>
    );
};