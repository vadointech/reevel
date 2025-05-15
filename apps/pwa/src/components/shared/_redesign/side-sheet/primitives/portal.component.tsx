"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export namespace SideSheetPortal {
    export type Props = PropsWithChildren;
}

export const SideSheetPortal = ({ children }: SideSheetPortal.Props) => {
    const containerRef = useRef<Element | null>(null);
    const [_, setMounted] = useState(false);

    useEffect(() => {
        containerRef.current = document.getElementById("bottom-sheet-root");
        setMounted(true);
    }, []);

    if(!containerRef.current) return null;

    return ReactDOM.createPortal(
        children,
        containerRef.current,
    );
};
