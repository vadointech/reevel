import { Transition } from "motion";
import { AnimationControls } from "motion/react";
import { useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";

type TruncateTextParams = {
    textHeight: number;
    openSuffix?: string;
    closeSuffix?: string;
    ellipsisChar?: string;
};

const TRANSITION_PARAMS: Transition = {
    type: "tween",
    duration: 0.15,
    ease: "easeOut",
};

export function useTruncatedText(animate: AnimationControls, {
    textHeight,
    ...params
}: TruncateTextParams) {

    const OPEN_SUFFIX = params.openSuffix || "More";
    const CLOSE_SUFFIX = params.closeSuffix || "Less";
    const ELLIPSIS_CHAR = params.ellipsisChar || "...";

    const isOpen = useRef(false);

    const fullText = useRef("");
    const truncatedText = useRef("");
    const initialScrollHeight = useRef(0);

    const ref = useRef<HTMLDivElement | null>(null);
    const refHandler = useCallback((element: HTMLDivElement | null) => {
        if(!element) return;
        ref.current = element;

        fullText.current = element.innerText;
        truncatedText.current = fullText.current;

        initialScrollHeight.current = element.scrollHeight;

        while (element.scrollHeight > element.offsetHeight && truncatedText.current.length > 0) {
            truncatedText.current = truncatedText.current.slice(0, -1).trim();
            ref.current.innerText = truncatedText.current;
        }

        setTruncatedText();
    }, []);

    const renderSuffix = (text: string, suffix: string) => {
        if(!ref.current) return;
        createRoot(ref.current).render(
            <>
                { text } <span onClick={handleToggleOpen}>{ suffix }</span>
            </>,
        );
    };

    const setTruncatedText = () => {
        const text = truncatedText.current.slice(
            0,
            -(OPEN_SUFFIX.length + ELLIPSIS_CHAR.length),
        ).trim();

        renderSuffix(
            text + ELLIPSIS_CHAR,
            OPEN_SUFFIX,
        );
    };

    const setFullText = () => {
        if(!ref.current) return;
        renderSuffix(fullText.current, CLOSE_SUFFIX);
    };

    const handleOpen = () => {
        if(!ref.current) return;

        isOpen.current = true;
        setFullText();
        animate.start({ height: initialScrollHeight.current }, TRANSITION_PARAMS);
    };

    const handleClose = () => {
        if(!ref.current) return;

        isOpen.current = false;
        setTruncatedText();
        animate.start({ height: textHeight }, TRANSITION_PARAMS);
    };

    const handleToggleOpen = useCallback(() => {
        if(!ref.current) return;
        return isOpen.current ? handleClose() : handleOpen();
    }, []);

    return [refHandler, handleToggleOpen] as const;
}