import { ComponentProps } from "react";

export const IconCreate = (props: ComponentProps<"svg">) => (
    <svg
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            x={0.75}
            y={0.793945}
            width={16.5}
            height={16.5}
            rx={5.25}
            stroke="currentColor"
            strokeWidth={1.5}
        />
        <path
            d="M14.2523 9.04386H9.34317M9.34317 9.04386H4.43408M9.34317 9.04386V4.13477M9.34317 9.04386V13.9529"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
