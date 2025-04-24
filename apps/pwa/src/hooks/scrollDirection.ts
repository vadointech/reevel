import { useDrawer } from "@/components/shared/drawer/drawer.component";
import { useEffect, useRef, useState } from "react";

export const useScrollDirection = (ref: React.RefObject<HTMLElement>) => {
    const [scrollingUp, setScrollingUp] = useState(false);
    const lastScrollTop = useRef(0);


    useEffect(() => {

        const el = ref.current;
        if (!el) return;

        const onScroll = () => {
            const currentScrollTop = el.scrollTop;

            const isScrollingUp = currentScrollTop < lastScrollTop.current;
            const isAtTop = currentScrollTop === 0;

            setScrollingUp(isScrollingUp && isAtTop);
            lastScrollTop.current = currentScrollTop;
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [ref]);

    return scrollingUp;
};
