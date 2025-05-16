import { AnimationControls, PanInfo } from "motion/react";
import { useEffect, useRef } from "react";

import { profileContentDragYPx } from "../motion-values";
import { PROFILE_PAGE_COVER_HEIGHT } from "../config";

import { Transition } from "motion";

const TRANSITION_PARAMS: Transition = {
    type: "tween",
    duration: 0.3,
    ease: "easeOut",
};

export function useProfileContentSnap(animate: AnimationControls) {
    const hasSnapped = useRef(false);
    const direction = useRef<"top" | "bottom">("top");

    useEffect(() => {
        const unsubscribe = profileContentDragYPx.on("change", (value) => {
            const position = value * -1;

            if(direction.current === "top" && !hasSnapped.current) {
                if(position >= PROFILE_PAGE_COVER_HEIGHT / 2 && position < PROFILE_PAGE_COVER_HEIGHT) {
                    hasSnapped.current = true;
                    animate.start({ y: -PROFILE_PAGE_COVER_HEIGHT }, TRANSITION_PARAMS);
                }
                return;
            }

            if(direction.current === "bottom" && hasSnapped.current) {
                if(position < PROFILE_PAGE_COVER_HEIGHT) {
                    hasSnapped.current = false;
                    animate.start({ y: 0 }, TRANSITION_PARAMS);
                }
            }
        });

        return () => unsubscribe();
    }, []);


    const handleDragEnd = (_: any, info: PanInfo) => {
        if(info.velocity.y > 0) {
            direction.current = "bottom";
        } else {
            direction.current = "top";
        }
    };

    return {
        handleDragEnd,
    };
}