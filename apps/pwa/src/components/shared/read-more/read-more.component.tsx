'use client';

import React, { ComponentProps, useState } from 'react';

import styles from './styles.module.scss';
import cx from 'classnames';

export namespace ReadMore {
    export type Props = ComponentProps<"div"> & {
        description: string;
        maxChars: number;
    };
}

const ReadMore = ({ className, description, maxChars = 100 }: ReadMore.Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const displayText = isExpanded ? description : description.slice(0, maxChars);

    return (
        <div className={cx(styles.container, className)}>
            <div className={styles.container__description}>
                {displayText}
                {description.length > maxChars && '...'}
                {description.length > maxChars && (
                    <button onClick={toggleReadMore}
                        className={cx(
                            styles.container__button,
                            { [`${styles.container__button_active}`]: isExpanded }
                        )}>
                        {isExpanded ? 'Less' : 'More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReadMore;