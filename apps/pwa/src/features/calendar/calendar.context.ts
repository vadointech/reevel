"use client";

import { createContext, useContext } from "react";
import { ICalendarStore } from "./types";

type CalendarContextValues = {
    store: ICalendarStore
};

export const CalendarContext = createContext<CalendarContextValues | null>(null);

export function useCalendarContext() {
    const ctx = useContext(CalendarContext);
    if(!ctx) throw new Error("useCalendarStore must be used within a CalendarStoreProvider");
    return ctx;
}