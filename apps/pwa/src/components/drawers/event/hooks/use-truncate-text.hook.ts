import { AnimationControls } from "motion/react";
import { useCallback, useRef } from "react";

type TruncateTextParams = {
    text: string;
    textHeight: number;
    openSuffix?: string[];
    closeSuffix?: string[];
};

export function useTruncatedText(animate: AnimationControls, {
    text,
    textHeight,
    openSuffix = [],
    closeSuffix = [],
}: TruncateTextParams) {
    const isOpen = useRef(false);

    const truncatedText = useRef("");
    const initialScrollHeight = useRef(0);

    const ref = useRef<HTMLDivElement | null>(null);
    const refHandler = useCallback((element: HTMLDivElement | null) => {
        if(!element) return;
        ref.current = element;

        initialScrollHeight.current = element.scrollHeight;
        truncatedText.current = element.innerText;

        while (element.scrollHeight > element.offsetHeight && truncatedText.current.length > 0) {
            truncatedText.current = truncatedText.current.slice(0, -1).trim();
            setTruncatedText.close();
        }
    }, []);

    const setTruncatedText = () => {};
    setTruncatedText.open = () => {
        if(!ref.current) return;
        ref.current.innerHTML = text + openSuffix.reduce((acc, item) => {
            return acc.concat(item);
        }, "");
    };
    setTruncatedText.close = () => {
        if(!ref.current) return;
        ref.current.innerHTML = truncatedText.current + closeSuffix.reduce((acc, item) => {
            return acc.concat(item);
        }, "");
    };

    const handleOpen = () => {
        if(!ref.current) return;

        isOpen.current = true;
        setTruncatedText.open();
        animate.start({ height: initialScrollHeight.current }, {
            type: "tween",
            duration: 0.15,
            ease: "easeOut",
        });
    };

    const handleClose = () => {
        if(!ref.current) return;

        isOpen.current = false;
        setTruncatedText.close();
        animate.start({ height: textHeight }, {
            type: "tween",
            duration: 0.15,
            ease: "easeOut",
        });
    };

    const handleToggleOpen = useCallback(() => {
        if(!ref.current) return;
        if(isOpen.current) return handleClose();
        else return handleOpen();
    }, []);

    return [refHandler, handleToggleOpen] as const;
}