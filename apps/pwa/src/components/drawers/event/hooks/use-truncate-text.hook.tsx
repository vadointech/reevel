import { useCallback, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

type TruncateTextParams = {
    textHeight: number;
    openSuffix?: string;
    closeSuffix?: string;
    ellipsisChar?: string;
};

export function useTruncatedText({
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
    const rootRef = useRef<Root | null>(null);
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
        if (!ref.current) return;

        if (!rootRef.current) {
            rootRef.current = createRoot(ref.current);
        }
        rootRef.current.render(
            <>
                { text } <span>{ suffix }</span>
            </>,
        );
    };

    const setTruncatedText = () => {
        const text = truncatedText.current.slice(
            0,
            -(OPEN_SUFFIX.length + ELLIPSIS_CHAR.length + 2),
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
        requestAnimationFrame(() => {
            if (ref.current) {
                ref.current.style.maxHeight = "fit-content";
            }
        });
    };

    const handleClose = () => {
        if(!ref.current) return;

        isOpen.current = false;
        setTruncatedText();
        requestAnimationFrame(() => {
            if (ref.current) {
                ref.current.style.maxHeight = textHeight + "px";
            }
        });
    };

    const handleToggleOpen = useCallback(() => {
        if(!ref.current) return;
        return isOpen.current ? handleClose() : handleOpen();
    }, []);

    return [refHandler, handleToggleOpen] as const;
}