import { useEffect, useRef } from "react";
import { AnimationControls, useAnimation } from "motion/react";

export function useMotionRef<Ref, P = unknown>(
    params: P,
    condition: (params: P, animate: AnimationControls) => void,
) {
    const animate = useAnimation();
    const ref = useRef<Ref | null>(null);

    useEffect(() => condition(params, animate), [params]);

    return { ref, animate };
}