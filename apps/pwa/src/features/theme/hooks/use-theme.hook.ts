"use client";

import { Dispatch, SetStateAction } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Theme } from "@/features/theme";

interface UseThemeProps {
    /** List of all available theme names */
    themes: Array<EnumValues<typeof Theme>>;
    /** Forced theme name for the current page */
    forcedTheme?: Theme | undefined;
    /** Update the theme */
    setTheme: Dispatch<SetStateAction<Theme>>;
    /** Active theme name */
    theme?: Theme | undefined;
    /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
    resolvedTheme?: Theme | undefined;
    /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
    systemTheme?: "dark" | "light" | undefined;
}

export function useTheme() {
    return useNextTheme() as UseThemeProps;
}