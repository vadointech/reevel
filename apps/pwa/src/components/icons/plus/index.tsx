import { ComponentProps } from "react";

export const IconPlus = (props: ComponentProps<"svg">) => (
    <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M11 6H6M6 6H1M6 6V1M6 6V11"
            stroke="#696A74"
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeLinejoin="round"
        />
    </svg>
);
