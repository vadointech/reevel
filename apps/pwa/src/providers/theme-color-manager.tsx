"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

const THEME_COLORS = {
    dark: "#000000",
    light: "#F7F7F7",
};

export function ThemeColorManager() {
    const { resolvedTheme } = useTheme();

    // useEffect(() => {
    //     // Отримуємо всі theme-color мета теги
    //     const metaTags = document.querySelectorAll('meta[name="theme-color"]');
    //
    //     // Оновлюємо контент для кожного тега
    //     metaTags.forEach(meta => {
    //         const currentColor = resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;
    //         meta.setAttribute("content", currentColor);
    //     });
    // }, [resolvedTheme]);

    return null;
}