"use client";

import { ComponentProps, ReactNode, useEffect, useRef } from "react";
import { IconCheck, IconClose, IconImportant } from "@/components/icons";
import { AnimatePresence, motion } from "motion/react";
import { ANIMATION_CONFIG } from "./config/root.config";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const toast = cva(styles.toast, {
    variants: {
        variant: {
            error: styles.toast_variant_error,
            success: styles.toast_variant_success,
            info: styles.toast_variant_info,
        },
    },
    defaultVariants: {
        variant: "error",
    },
});


export namespace Toast {
    export type Props = ComponentProps<"div"> & VariantProps<typeof toast> & {
        message: string;
        hint: string,
        autoClose?: boolean,
        autoCloseDelay?: number;
        isVisible?: boolean;
        onClose: () => void;
    };
}
export const Toast = ({
    variant = "error",
    message,
    hint,
    autoClose = true,
    autoCloseDelay = 5000,
    isVisible = true,
    onClose,
    className,
}: Toast.Props) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);



    useEffect(() => {
        if (!autoClose || !isVisible) return;

        timeoutRef.current = setTimeout(() => {
            onClose();
        }, autoCloseDelay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [autoClose, autoCloseDelay, isVisible, onClose]);


    // const handleClose = useCallback((event: MouseEvent) => {
    //     event.stopPropagation();
    //
    //     if (timeoutRef.current) {
    //         clearTimeout(timeoutRef.current);
    //     }
    //
    //     onClose();
    // }, [onClose]);

    const icon: Record<string, ReactNode> = {
        "error": <IconClose />,
        "success": <IconCheck />,
        "info": <IconImportant />,
    };

    const safeVariant = variant || "error";

    const toastContent = (
        <motion.div
            className={toast({ variant, className })}
            {...ANIMATION_CONFIG}

        >
            <div className={styles.toast__icon}>
                {icon[safeVariant]}
            </div>
            <div className={styles.toast__text}>
                {message}

                <span>
                    {hint}
                </span>
            </div>
            {/* <div className={styles.toast__close} onClick={handleClose}>
                <IconClose />
            </div> */}
        </motion.div>
    );


    return (
        <AnimatePresence mode="wait">
            {isVisible && toastContent}
        </AnimatePresence>
    );
};
