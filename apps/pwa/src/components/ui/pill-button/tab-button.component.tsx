'use client'

import { ComponentProps, ReactNode } from 'react';
import styles from './styles.module.scss'
import cx from "classnames";

export type TabButtonVariant = 'default' | 'primary' | 'outline' | 'icon' | 'dashed';

export namespace TabButton {
    export type Props = Omit<ComponentProps<'button'>, 'onChange'> & {
        variant?: TabButtonVariant
        name: string
        icon?: ReactNode | string
        selected?: boolean
        onChange: (selected: boolean) => void
    }
}

export const TabButton = ({
    variant = 'default',
    name,
    icon,
    selected = false,
    onChange,
    className,
    ...props
}: TabButton.Props) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onChange(!selected);
    };

    return (
        <button
            type='button'
            role='switch'
            aria-checked={selected}
            aria-label={name}
            className={cx(
                styles.button,
                styles[`button__variant_${variant}`],
                selected && styles.button__selected,
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {icon && (
                <div className={styles.button__icon}>
                    {icon}
                </div>
            )}
            <p className={styles.button__text}>{name}</p>
        </button>
    );
};