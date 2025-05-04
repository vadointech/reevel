import { ComponentProps, createElement, FC, JSX } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

type TypographyElement = keyof JSX.IntrinsicElements;

const _typography = [
    "xxs",
    "xs",
    "sm",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
] as const;

export namespace Typography {
    export type Props<E extends TypographyElement> = ComponentProps<E> & {
        size?: typeof _typography[number];
    };
}

function createTypographyComponent<T extends TypographyElement>(tag: T): FC<Typography.Props<T>> {
    return ({ size = "base", className, ...props }) => {
        return createElement(tag, {
            className: cx(
                styles.typography,
                styles[`typography_${size}`],
                className,
            ),
            ...props,
        });
    };
}

export const Typography = {
    h1: createTypographyComponent("h1"),
    h2: createTypographyComponent("h2"),
    h3: createTypographyComponent("h3"),
    h4: createTypographyComponent("h4"),
    p: createTypographyComponent("p"),
    div: createTypographyComponent("div"),
    span: createTypographyComponent("span"),
};
