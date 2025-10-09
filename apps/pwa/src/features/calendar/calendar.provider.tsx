"use client";

import { PropsWithChildren } from "react";
import { useMobxStore } from "@/lib/mobx";

import { CalendarContext } from "./calendar.context";
import { CalendarStore } from "./calendar.store";

export namespace CalendarProvider {
    export type Props = PropsWithChildren;
}

export const CalendarProvider = ({children }: CalendarProvider.Props) => {
    const store = useMobxStore(CalendarStore);
    return (
        <CalendarContext.Provider value={{ store }}>
            { children }
        </CalendarContext.Provider>
    );
};