import { useEffect, useRef } from "react";

// import { profileContentDragYPx } from "../motion-values";

// const VELOCITY_THRESHOLD = 500;
//
// const TRANSITION_PARAMS: Transition = {
//     type: "tween",
//     duration: 0.3,
//     ease: "easeOut",
// };

export function useProfileContentSnap() {
    // const hasSnapped = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    // const animation = useRef<AnimationPlaybackControls | null>(null);

    // const { scrollY } = useScroll({
    //     container: containerRef,
    // });

    // const runSnapAnimation = (targetY: number) => {
    //     if (!containerRef.current) return;
    //
    //     animation.current?.stop();
    //
    //     animation.current = animate(containerRef.current.scrollTop, targetY, {
    //         ...TRANSITION_PARAMS,
    //         onUpdate: (latest) => {
    //             if (containerRef.current) {
    //                 containerRef.current.scrollTop = latest;
    //             }
    //         },
    //         onComplete: () => {
    //             animation.current = null;
    //         },
    //     });
    // };

    useEffect(() => {
        // const unsubscribe = scrollY.on("change", () => {
        // const prev = profileContentDragYPx.get();
        // const velocity = Math.abs(scrollY.getVelocity());
        //
        // const isAnimating = !!animation.current;
        // // const isAnimating = true;
        //
        // if(!isAnimating) {
        //     const direction = prev > position ? "top" : "bottom";
        //
        //     if(velocity < VELOCITY_THRESHOLD) {
        //         if(direction === "bottom" && !hasSnapped.current) {
        //             if(position >= PROFILE_PAGE_COVER_HEIGHT / 2 && position < PROFILE_PAGE_COVER_HEIGHT) {
        //                 hasSnapped.current = true;
        //                 runSnapAnimation(PROFILE_PAGE_COVER_HEIGHT);
        //             }
        //         }
        //
        //         if(direction === "top" && hasSnapped.current) {
        //             if(position < PROFILE_PAGE_COVER_HEIGHT) {
        //                 hasSnapped.current = false;
        //                 runSnapAnimation(0);
        //             }
        //         }
        //     }
        // }

        // profileContentDragYPx.set(position);
        // });

        return () => {
            // unsubscribe();
            // animation.current?.stop();
        };
    }, []);

    return {
        containerRef,
    };
}