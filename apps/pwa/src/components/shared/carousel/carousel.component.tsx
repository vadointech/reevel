"use client"

import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames"

export namespace Carousel {
    export type Position = { row: number; col: number };

    export type Props = ComponentProps<"div"> & {
        elements: React.ReactNode[];
        positions: [Position, Position, Position];
        rows?: number;
        cols?: number;
    };
}

export const Carousel = ({
    elements,
    positions,
    rows = 3,
    cols = 20,
    className,
    ...props
}: Carousel.Props) => {

    const grid: (ReactNode | null)[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => null)
    );

    positions.forEach((pos, i) => {

        if (
            pos.row >= 0 && pos.row < rows &&
            pos.col >= 0 && pos.col < cols
        ) {
            grid[pos.row][pos.col] = (
                <>
                    {elements[i]}
                </>
            );
        }
    });

    return (
        <div className={cx(styles.grid, className)} {...props}>
            {grid.map((row, rIdx) =>
                row.map((cell, cIdx) => (
                    <div className={styles.cell} key={`${rIdx}-${cIdx}`}>
                        {cell}
                    </div>
                ))
            )}
        </div>
    );
};