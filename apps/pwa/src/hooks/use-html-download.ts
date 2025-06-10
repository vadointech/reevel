import { useCallback, useRef, useState } from "react";
import { domToBlob } from "modern-screenshot";

export const useHtmlDownload = (
    shareUrl: string,
    hideSelectors: string[],
) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible(false);
    };

    const copyLink = useCallback(async() => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            return true;
        } catch {
            return false;
        }
    }, [shareUrl]);


    const applyHideStyles = useCallback(() => {
        const hiddenEls: HTMLElement[] = [];
        if (!contentRef.current) return () => { };
        hideSelectors.forEach((selector) => {
            contentRef.current!.querySelectorAll(selector).forEach((el) => {
                if (el instanceof HTMLElement) {
                    el.classList.add("invisible-for-image");
                    hiddenEls.push(el);
                }
            });
        });
        return () => {
            hiddenEls.forEach((el) => el.classList.remove("invisible-for-image"));
        };
    }, [hideSelectors]);


    const getImageBlob = useCallback(async() => {
        if (!contentRef.current) return null;
        const revert = await applyHideStyles();

        await new Promise((res) => setTimeout(res, 30));
        try {
            const blob = await domToBlob(contentRef.current, { scale: 2 });
            return blob;
        } finally {
            revert();
        }
    }, [applyHideStyles]);

    const downloadImage = useCallback(async() => {
        const blob = await getImageBlob();
        if (!blob) {
            return false;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "event-share.png";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        return true;
    }, [getImageBlob]);

    const shareImage = useCallback(async() => {
        const linkCopied = await copyLink();
        if (!linkCopied) {
            return false;
        }
        setIsVisible(true);

        const blob = await getImageBlob();
        if (!blob) {
            return false;
        }
        const file = new File([blob], "event-share.png", { type: "image/png" });
        if (
            navigator.canShare &&
            navigator.canShare({ files: [file], url: shareUrl })
        ) {
            try {
                await navigator.share({
                    files: [file],
                    url: shareUrl,
                });
                return true;
            } catch {
                return false;
            }
        }
        return false;
    }, [getImageBlob, shareUrl, copyLink]);

    const shareLink = useCallback(async() => {
        if (navigator.canShare && navigator.canShare({ url: shareUrl })) {
            try {
                await navigator.share({ url: shareUrl });
                return true;
            } catch {
                return false;
            }
        }
        return false;
    }, [shareUrl]);


    return {
        handleIsVisible,
        isVisible,
        copyLink,
        contentRef,
        shareLink,
        shareImage,
        downloadImage,
    };
};