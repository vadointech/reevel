import { observable } from "mobx";
import { MotionValue } from "motion";
import { useSpring } from "motion/react";

const scrollYPx = observable.box(new MotionValue(0));
export function setScrollYPx(value: MotionValue) {
    scrollYPx.set(value);
}
export function useScrollYPx() {
    return useSpring(scrollYPx.get(), {
        stiffness: 1000,
        damping: 40,
        restDelta: 0.005,
        mass: 0.03,
    });
}