"use client";

import { ThemeProvider as NextThemeProvider, ThemeProviderProps as NextThemeProviderProps } from "next-themes";

import { Theme } from "./theme.config";

export namespace ThemeProvider {
    export type Props = NextThemeProviderProps;
}

export const ThemeProvider = (props: ThemeProvider.Props) => {
    return (
        <NextThemeProvider
            enableSystem
            attribute={"data-theme"}
            defaultTheme={Theme.SYSTEM}
            value={{
                [Theme.DARK]: "dark",
                [Theme.LIGHT]: "light",
            }}
            {...props}
        />
    );
};
