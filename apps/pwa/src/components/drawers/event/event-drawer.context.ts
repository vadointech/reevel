"use client";

import { createContext, useContext } from "react";
import { MotionValue } from "motion/react";
import { EventDrawerConfig } from "./types";

type EventDrawerContextValues = {
    drawerDragYProgress: MotionValue<number>;
    drawerContentDragYPx: MotionValue<number>;
    drawerContentDragYProgress: MotionValue<number>;
    config: EventDrawerConfig;
};

export const EventDrawerContext = createContext<EventDrawerContextValues | null>(null);

export function useEventDrawerContext() {
    const ctx = useContext(EventDrawerContext);
    if(!ctx) {
        throw new Error("useEventDrawerContext must be used within <EventDrawerProvider />");
    }
    return ctx;
}