import { useEffect, useState } from "react";

export function useBottomSheetIsOpen() {
    const [hasContent, setHasContent] = useState(false);

    useEffect(() => {
        const modalRoot = document.getElementById("modal-root");
        if (!modalRoot) {
            setHasContent(false);
            return;
        }
        setHasContent(modalRoot.childElementCount > 0);

        const observer = new MutationObserver(() => {
            setHasContent(modalRoot.childElementCount > 0);
        });
        observer.observe(modalRoot, { childList: true });

        return () => observer.disconnect();
    }, []);

    return hasContent;
}