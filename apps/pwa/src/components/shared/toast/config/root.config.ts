export const ANIMATION_CONFIG = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
    },
} as const;